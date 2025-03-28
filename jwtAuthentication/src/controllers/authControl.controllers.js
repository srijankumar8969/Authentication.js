import user  from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { jwtTokenCreator } from "../utils/jwtTokenCreator.utils.js";
export const signup =  async (req,res)=>{
    try {
        const {username, email, password} = req.body;
        if(!username || !email || !password){
            return res.status(400).json({message: "All fields are required"});
        }
        const User = await user.findOne({email});

        if(User){
            return res.status(400).json({message: "User already exists"});
        }

        else{
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const newUser = new user({
                email,
                password: hashedPassword,
                name: username
            });

            if(newUser){
                await newUser.save();
                const tok = jwtTokenCreator(newUser._id, res);
                return res.status(201).json({1:{username: newUser.name, email: newUser.email, id: newUser._id},2:{token:tok}});
            }
            else{
                return res.status(500).json({message: "Internal server error"});
            }
        }
    } catch (error) {
        console.log(error);
    }
};

export const login = async (req,res)=>{
    try {
            const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({message: "All fields are required"});
        }
        const foundUser = await user.findOne({email});
        if(!foundUser){
            return res.status(400).json({message: "User does not exist"});
        }
        const isMatch = await bcrypt.compare(password, foundUser.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid credentials"});
        }
        const tok = jwtTokenCreator(foundUser._id, res);
        return res.status(200).json({1:{username: foundUser.name, email: foundUser.email, id: foundUser._id},2:{token:tok}, 3:{message: "Login successful"}});
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

export const logout = (req,res)=>{
    try {
        res.clearCookie("jwtTokenforJwttokenbasedAuthorization");
        console.log("logout ho gaya ")
        return res.status(200).json({message: "Logged out successfully"});
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}