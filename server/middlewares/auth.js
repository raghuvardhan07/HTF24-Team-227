const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
    const token = req.cookies.token; // Read the token from the cookie
    if (!token) {
        return res.status(403).json("You need to sign in");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id; // Store user ID in request
        next();
    } catch (error) {
        return res.status(403).json("Invalid token, please sign in again");
    }
};

module.exports = authMiddleware;
