"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGetUser = exports.handleLogin = exports.handleRegistration = void 0;
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const schema_1 = require("./schema");
const handleRegistration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, number, email, address, password, cpassword } = req.body;
    if (name == "" ||
        number == "" ||
        email == "" ||
        address == "" ||
        password == "" ||
        cpassword == "") {
        return res.json({ status: false, message: "required fields are empty" });
    }
    if (password != cpassword)
        return res.json({ status: false, message: "passwords mismatch" });
    const userExists = yield schema_1.UserSchema.findOne({ email });
    if (userExists)
        return res.json({ status: false, message: `user with email ${email} already exists` });
    const salt = yield (0, bcrypt_1.genSalt)(10);
    const hashedPassword = yield (0, bcrypt_1.hash)(password, salt);
    try {
        const user = yield schema_1.UserSchema.create({
            name, number, email, address, password: hashedPassword
        });
        const payload = {
            name: user.name,
            number: user.number,
            email: user.email,
            address: user.address
        };
        const authtoken = (0, jsonwebtoken_1.sign)(payload, process.env.JWT_SECRET);
        res.json({ success: true, authtoken });
    }
    catch (err) {
        console.log(err);
    }
});
exports.handleRegistration = handleRegistration;
const handleLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (email == "" || password == "")
        return res.json({ status: false, message: "missing fields" });
    const user = yield schema_1.UserSchema.findOne({ email });
    if (!user)
        return res.json({ status: false, message: "invalid credentials" });
    const match = yield (0, bcrypt_1.compare)(password, user === null || user === void 0 ? void 0 : user.password);
    if (!match)
        return res.json({ status: false, message: "invalid credentials" });
    const payload = {
        name: user.name,
        number: user.number,
        email: user.email,
        address: user.address
    };
    const authtoken = (0, jsonwebtoken_1.sign)(payload, process.env.JWT_SECRET);
    res.json({ success: true, authtoken });
});
exports.handleLogin = handleLogin;
const handleGetUser = (req, res) => {
    const user = req.user;
    res.json({ user });
};
exports.handleGetUser = handleGetUser;
