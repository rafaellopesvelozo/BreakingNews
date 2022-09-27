const express = require("express");
const app = express();
const connectDatabase = require("./src/database/db")

const userRoute = require("./src/routes/user.route");

const PORT = 3000;

connectDatabase()
//enviar e receber arquivos json
app.use(express.json())
app.use("/user", userRoute);

app.listen(PORT, () =>
  console.log(`servidor rodando na porta http://localhost:${PORT}`)
);
