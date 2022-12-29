"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const validateToken = (req, res, next) => {
    const token = req.header('authtoken');
    if (!token)
        return res.json({ status: false, message: "Invalid token" });
    try {
        const user = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    }
    catch (err) {
        return res.json({ status: false, message: "Invalid token" });
    }
};
exports.validateToken = validateToken;
