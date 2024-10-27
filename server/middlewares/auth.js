const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
    } catch (error) {
        return res.status(403).json("you need to signin");
    }
    next();
};

module.exports = authMiddleware;
