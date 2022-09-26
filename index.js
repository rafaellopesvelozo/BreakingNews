const express = require("express");
const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("oi");
});

app.listen(PORT,() => console.log(`servidor rodando na porta http://localhost:${PORT}`));
