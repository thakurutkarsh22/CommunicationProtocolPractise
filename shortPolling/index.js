const expressApp = require("express")();

// dictonary of the jobs..
const jobs = {};

expressApp.post("/submit", (req, res) => {
  const jobId = `job:${Date.now()}`;
  jobs[jobId] = 0;
  updateJob(jobId, 0);
  res.end("\n\n" + jobId + "\n\n");
});

expressApp.get("/checkstatus", (req, res) => {
  console.log(jobs[req.query.jobId]);
  res.end("\n\n" + jobs[req.query.jobId] + "%\n\n");
});

expressApp.listen(8080, () => console.log("listining on 8080"));

// if progress is 100 quit otherwise every3 seconds update the progress by 10
function updateJob(jobId, progress) {
  jobs[jobId] = progress;
  console.log(`updated ${jobId} to ${progress}`);
  if (progress == 100) return;
  setTimeout(() => {
    updateJob(jobId, progress + 10);
  }, 3000);
}

/// --------- client code ----------- (client calls again n again n agian and it congest the network)

// curl -X POST http://localhost:8080/submit

// curl http://localhost:8080/checkstatus?jobId=job:${jobIdfromtheClient}
