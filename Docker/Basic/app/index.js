const app = require("express")();

app.get("/", (req, res) =>
  res.send("hello from the light weight container!!!")
);
app.listen(9999, () => console.log("Listining on port 9999"));
