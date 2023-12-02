// old way js is basically tearing down the connection and establishing new connections to DB for every request

const app = require("express")();
const { Client } = require("pg");

app.get("/all", async (req, res) => {
  const fromDate = new Date();

  const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "postgres",
    database: "postgres",
  });

  // connect
  await client.connect();

  const results = await client.query("select * from url_table");
  console.table(results.rows);

  //   end
  client.end();

  const toDate = new Date();
  const elapsedTime = toDate.getTime() - fromDate.getTime();

  res.send({
    rows: results.rows,
    elapsed: elapsedTime,
    method: "old method of NO COMMECTION POOLING EXAMPLE",
  });
});

app.listen(9000, () => console.log("listining on port 9000"));
