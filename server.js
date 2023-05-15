import { app } from "./app.js";
import { connectDB } from "./data/database.js";

//connecting to MongoDB database 
connectDB();

app.listen(process.env.PORT,()=>{
    console.log(`TaskService is working on port:${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
});