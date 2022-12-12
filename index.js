import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.js";
import expenseRouter from "./routes/expenses.js"
import budgetRouter from "./routes/budget.js"

const app = express();
dotenv.config();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/expenses", expenseRouter)
app.use("/budget", budgetRouter)

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Could not connect to MongoDB", err);
  });
