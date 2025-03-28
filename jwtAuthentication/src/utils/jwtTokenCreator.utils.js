import jwt from "jsonwebtoken";

export const jwtTokenCreator = (userid, res) => {
    const token = jwt.sign({userid},  process.env.JWT_SECRET, {expiresIn: "1h"});
    res.cookie("jwtTokenforJwttokenbasedAuthorization", token, {
        maxAge:  1*60*60*1000, // MS
        httpOnly: true, // prevent XSS attacks cross-site scripting attacks
        sameSite: "strict", // CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "development"
      });
    return token;
}