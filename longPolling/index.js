const expressApp = require("express")();

// dictonary of the jobs..
const jobs = {};

expressApp.post("/submit", (req, res) => {
  const jobId = `job:${Date.now()}`;
  jobs[jobId] = 0;
  updateJob(jobId, 0);
  res.end("\n\n" + jobId + "\n\n");
});

expressApp.get("/checkstatus", async (req, res) => {
  console.log(jobs[req.query.jobId]);
  while ((await checkJobComplete(req.query.jobId)) === false) {}
  res.end("\n\n" + jobs[req.query.jobId] + "%\n\n");
});

expressApp.listen(8080, () => console.log("listining on 8080"));

async function checkJobComplete(jobId) {
  return new Promise((res, rej) => {
    if (jobs[jobId] < 100) {
      setTimeout(() => {
        res(false);
      }, 1000);
    } else {
      res(true);
    }
  });
}

// if progress is 100 quit otherwise every3 seconds update the progress by 10
function updateJob(jobId, progress) {
  jobs[jobId] = progress;
  console.log(`updated ${jobId} to ${progress}`);
  if (progress == 100) return;
  setTimeout(() => {
    updateJob(jobId, progress + 10);
  }, 3000);
}

/// --------- client code ----------- (client calls and wait and wait and wait this makes one request and less clutter in netwok)

// curl -X POST http://localhost:8080/submit

// curl http://localhost:8080/checkstatus?jobId=job:${jobIdfromtheClient}
