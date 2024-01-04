const express = require("express");
const path = require("path");
const app = express();

const port = 4000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.listen(port, (req, res) => {
  console.log(`app started on port: ${port}`);
});
