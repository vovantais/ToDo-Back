import express from "express";
import authRoute from "./routers/auth";
import homeRoute from "./routers/home";
import tasksRouter from './routers/tasks';
import mongoose from "mongoose";
import { CONNECT_MONGODB } from "./variables/variables";


const app = express();
const PORT = 5001;

app.use(authRoute);
app.use(homeRoute);
app.use(tasksRouter);

const start = async () => {
   try {
      await mongoose.connect(CONNECT_MONGODB, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useCreateIndex: true,
      });
      app.listen(PORT, () => console.log('Server Listen on Port 5001!'));
   } catch (e) {
      console.log("Server error", e.message);
   }
};
start();





