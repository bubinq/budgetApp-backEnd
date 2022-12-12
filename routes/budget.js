import express from "express"
import { editBudget, getUserBudget, setBudget } from "../contollers/budget.js";
import { verifyToken } from "../verifyToken.js"


const router = express.Router()

router.get("/get/:userId", getUserBudget)
router.post("/create", verifyToken, setBudget)
router.put("/edit", verifyToken, editBudget)

export default router;