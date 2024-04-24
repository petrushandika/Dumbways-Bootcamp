const express = require("express");
const app = express();
const port = 5000;

// routes
app.get("/", (req, res) => {
  res.send("Server Valid!");
});

app.listen(port, () => {
  console.log("Server is running on PORT: ", port);
});
