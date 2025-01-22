import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    },
    verify: {
        type: Boolean,
        default : false
    }
})

export default mongoose.model("person", userSchema)