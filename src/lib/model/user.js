import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
}, { timestamps: true });

export default mongoose.models.todos || mongoose.model("todos", todoSchema);
