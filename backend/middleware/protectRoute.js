import jwt from "jsonwebtoken";
import User from "../model/usermodel.js";

const protectRoute = async (req, res, next) => {
    try {

        const token = req.cookies.jwt;
        console.log("Token:", token);

        if (!token) {
            return res.status(401).json({ error: "Unauthorized no token found" });
        }               
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ error: "Invalid token" });
        }

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }

        req.user = user;

        next();

    } catch (error) {
        console.log("Error in protectRoute middleware:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export default protectRoute;
