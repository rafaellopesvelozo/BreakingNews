const express = require("express");
const app = express();

const userRoute = require("./src/routes/user.route");

const PORT = 3000;

//enviar e receber arquivos json
app.use(express.json())
app.use("/user", userRoute);

app.listen(PORT, () =>
  console.log(`servidor rodando na porta http://localhost:${PORT}`)
);
