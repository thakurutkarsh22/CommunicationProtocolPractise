// old way js is basically tearing down the connection and establishing new connections to DB for every request

const app = require("express")();
const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "postgres",
  database: "postgres",
  max: 20, // default connection is 10
  connectionTimeoutMillis: 0, // retry foreever for getting the connection. 0 means that and other values means wait for that amount of time
  idleTimeoutMillis: 0, // default is 10s, if connection is not being used we need to wait for some time to get destroyed, 0 means no destruction
  // and why we need destruction bec the file descriptiors take space in the memory.
});

app.get("/all", async (req, res) => {
  const fromDate = new Date();

  const results = await pool.query("select * from url_table");
  console.table(results.rows);

  const toDate = new Date();
  const elapsedTime = toDate.getTime() - fromDate.getTime();

  res.send({
    rows: results.rows,
    elapsed: elapsedTime,
    method: "New method of connectoin poling ",
  });
});

app.listen(9000, () => console.log("listining on port 9000"));

// We can see the differnece in the elapsed time in both the new and old.
