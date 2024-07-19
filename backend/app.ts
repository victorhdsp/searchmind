import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import router from "./routes";
import "./auth/passport";
import "./prisma";

const app = express();

const PORT = process.env.PORT || 5000;
app.use(express.json());

app.use(cors());
app.use(router);

app.listen(PORT, () => {
    console.log("Servidor rodando na porta: ", PORT);
}).on("error", (error) => {
    throw new Error(error.message);
})