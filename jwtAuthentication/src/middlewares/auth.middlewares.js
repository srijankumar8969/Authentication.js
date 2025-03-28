import jwt from "jsonwebtoken";
import user from "../models/user.model.js";
export const protect = async (req,res,next)=>{
    // console.log("reuest recevied ", req.cookies)
    try {
        const token = req.cookies.jwtTokenforJwttokenbasedAuthorization;
        // console.log("token recevied", token)
    if(!token){
        return res.status(401).json({massage: "unauthorized user"})
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if(!decode){
        return res.status(401).json({massage:"token not valid"});
    }
    const User = await user.findById(decode.userid).select("-password"); 
    req.user = user;
    next();
    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}