import express from "express";
import connectDatabase from "./src/database/db.js";
import dotenv from "dotenv";

import userRoute from "./src/routes/user.route.js";
import authRoute from "./src/routes/auth.route.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
connectDatabase();

//enviar e receber arquivos json
app.use(express.json());
app.use("/user", userRoute);
app.use("/auth", authRoute)

app.listen(PORT, () =>
  console.log(`servidor rodando na porta http://localhost:${PORT}`)
);
