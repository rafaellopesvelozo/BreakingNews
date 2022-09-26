const express = require("express");
const userRoute = require("./src/routes/user.route");
const app = express();

const PORT = 3000;

app.use('/soma', userRoute)


app.listen(PORT, () =>
  console.log(`servidor rodando na porta http://localhost:${PORT}`)
);
