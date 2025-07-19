import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const userMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies?.Authorization;
        if(!token) return res.status(400).json({message: "UnAuthorized: Token not provided"});

        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        if(Date.now() > decoded.exp) return res.status(401).json({message:"Expired token"});
        const user = await User.findOne({_id:decoded.id});
        if (!user) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
                }
        req.user = user;
        next();

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error", error });
    }
}