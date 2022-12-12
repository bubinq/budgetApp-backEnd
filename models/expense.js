import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    ownerId: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        default: "orange"
    }
}, {timestamps: true})

export default mongoose.model("Expense", expenseSchema);