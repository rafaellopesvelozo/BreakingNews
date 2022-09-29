import express from "express";
import connectDatabase from "./src/database/db.js";
import userRoute from "./src/routes/user.route.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
connectDatabase();

//enviar e receber arquivos json
app.use(express.json());
app.use("/user", userRoute);

app.listen(PORT, () =>
  console.log(`servidor rodando na porta http://localhost:${PORT}`)
);
