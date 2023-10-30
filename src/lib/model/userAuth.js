import mongoose from "mongoose";

const userAuthSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    confirmPassword: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });


export default mongoose.models.userAuth || mongoose.model("userAuth", userAuthSchema);