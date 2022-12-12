import express from "express";
import { verifyToken } from "../verifyToken.js";
import {
  addExpense,
  deleteExpense,
  getRecentUserExpenses,
  getAllUserExpenses,
  getMonthlyUserExpenses,
  getUserPrefExpenses,
  getLastThreeMonthsAmounts,
} from "../contollers/expense.js";

const router = express.Router();

router.get("/all/:userId", getAllUserExpenses);
router.post("/getLatest", verifyToken, getLastThreeMonthsAmounts);
router.post("/userPref/:userId", getUserPrefExpenses);
router.post("/monthly/:userId", getMonthlyUserExpenses);
router.get("/recent/:userId", getRecentUserExpenses);
router.post("/create", verifyToken, addExpense);
router.delete("/delete/:expenseId", verifyToken, deleteExpense);

export default router;
