const app = require("express")();
const { Client } = require("pg");
const crypto = require("crypto");

// Adding server in consistant hash ring

const HashRing = require("hashring");
const hr = new HashRing();
hr.add("5432");
hr.add("5433");
hr.add("5434");

// --- end of adding server adding to ring.

const clients = {
  5432: new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "postgres",
    database: "postgres",
  }),
  5433: new Client({
    host: "localhost",
    port: 5433,
    user: "postgres",
    password: "postgres",
    database: "postgres",
  }),
  5434: new Client({
    host: "localhost",
    port: 5434,
    user: "postgres",
    password: "postgres",
    database: "postgres",
  }),
};

async function connect() {
  await clients["5432"].connect();
  await clients["5433"].connect();
  await clients["5434"].connect();
}
connect();

app.get("/:urlId", async (req, res) => {
  // localhost:8081/yr7B1
  // https://google.com.in?q=test2
  const urlId = req.params.urlId;
  const server = hr.get(urlId);

  // This can possibly protech me from sql injection
  const result = await clients[server].query(
    "SELECT * FROM URL_TABLE WHERE url_id = $1",
    [urlId]
  );
  console.log(result, "result");

  if (result.rowCount > 0) {
    res.send({
      urlId,
      server,
      url: result.rows[0],
    });
  } else {
    res.sendStatus(404);
  }
});

app.post("/addUrlInBulk", async (req, res) => {
  const urls = [];
  for (let i = 0; i < 100; i++) urls.push(`https://google.com.in?q=test${i}`);
  urls.forEach(
    async (url) => {
      const hash = crypto.createHash("sha256").update(url).digest("base64");
      const urlId = hash.substring(0, 5);
      const hashRankedServer = hr.get(urlId);
      await clients[hashRankedServer].query(
        "INSERT INTO URL_TABLE (URL, URL_ID) VALUES($1, $2)",
        [url, urlId]
      );
      console.log("hash debug", hash);

      // res.send({
      //   urlId,
      //   url,
      //   server: hashRankedServer,
      // });
    }
    // fetch(`http://localhost:8081/?url=${u}`, { method: "POST" })
    //   .then((a) => a.json())
    //   .then((data) => console.log(data))
  );

  res.send({
    success: true,
  });
});
app.post("/", async (req, res) => {
  const url = req.query.url;

  console.log("url", url);
  // Consistent has this post to get the server
  const hash = crypto.createHash("sha256").update(url).digest("base64");
  const urlId = hash.substring(0, 5);
  const hashRankedServer = hr.get(urlId);
  console.log("hash debug", hash);

  // after generating the corresponding has for a link and a server where it will be served now its time to
  // save in the database.

  await clients[hashRankedServer].query(
    "INSERT INTO URL_TABLE (URL, URL_ID) VALUES($1, $2)",
    [url, urlId]
  );

  res.send({
    urlId,
    url,
    server: hashRankedServer,
  });
});

app.listen(8081, () => console.log("listning to port 8081"));
