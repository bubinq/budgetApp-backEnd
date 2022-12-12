import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    displayName: {
        type: String,
        required: true,
        unique: true
    },
    profileUrl : {
        type: String
    }
}, {timestamps: true})

export default mongoose.model("User", userSchema);