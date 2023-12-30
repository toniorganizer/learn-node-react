import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import UserRoute from './routes/UserRoute.js';
import db from "./config/Database.js";

dotenv.config();
const app = express();

try {
    await db.authenticate();
    console.log('Database Connected');
} catch (error) {
    console.error(error);
}

app.use(cookieParser());
app.use(cors({credentials:true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(UserRoute);

app.listen(5000, () => console.log('Server berjalan..'));