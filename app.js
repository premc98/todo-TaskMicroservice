import express from "express";
//import userRouter from "./routes/users.js";
import tasksRouter from "./routes/tasks.js";
import {config} from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app = express();
config({
    path: "./data/config.env"
});

//Using Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URL], //backend only accepts requests from specified frontend origins
    methods: ["GET", "POST", "PUT", "DELETE"], //define the methods that the backend accepts.
    credentials: true, //this option is to enable sending cookies and other headers from backend to frontend

}));

//Using routes
//app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", tasksRouter);

app.get("/taskservice", (req,res)=>{
    res.send("This is the Task management Microservice")
});

//Global Error Middleware
app.use(errorMiddleware);