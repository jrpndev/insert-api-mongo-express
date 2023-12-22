import jwt from "jsonwebtoken";
import { environment } from "../environment/environment.js";

const SECRET_KEY = environment.SECRET_KEY;

const authenticateToken = (req, res, next) => {
    const tokenWithPrefix = req.header("Authorization");

    if (!tokenWithPrefix) {
        return res.status(401).json({ message: "Unauthorized: Token not provided" });
    }

    const token = tokenWithPrefix.replace(/^Bearer\s/, '');

    console.log("Received token:", token);

    jwt.verify(token, `${SECRET_KEY}`, (err, user) => {
        if (err) {
            console.error("Token verification error:", err);
            return res.status(403).json({ message: "Forbidden: Invalid token" });
        }
        req.userId = user.userId;
        next();
    });
};

export default authenticateToken;
