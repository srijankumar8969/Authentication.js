import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema({
  name: { 
        type: String,
        required: true
        },
    email: { 
        type: String,
        required: true,
        unique: true
        },
    password: { 
        type: String,
        required: true
                },
        },
        { timestamps: true });

const user = mongoose.model('user', userSchema);
export default user;