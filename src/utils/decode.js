import { environment } from "../environment/environment.js";
import jwt from "jsonwebtoken";
const SECRET_KEY = environment.SECRET_KEY;
const extractUserIdFromToken = (token) => {
    try {
        if (!token) {
            throw new Error("Token not provided");
        }
        const tokenWithoutPrefix = token.replace(/^Bearer\s/, '');
        const decoded = jwt.verify(tokenWithoutPrefix, SECRET_KEY);

        if (!decoded || !decoded.userId) {
            throw new Error("Invalid token or missing userId");
        }

        return decoded.userId;
    } catch (error) {
        console.error("Error extracting userId from token:", error.message);
        return null;
    }
};

export default extractUserIdFromToken;