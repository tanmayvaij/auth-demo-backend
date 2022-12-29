"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// top level imports
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./db");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// enabled all environment variables
(0, dotenv_1.config)();
// server settings
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// importing all routers 
const Auth_1 = __importDefault(require("./routes/Auth"));
// using all routers
app.use('/api/auth', Auth_1.default);
// starting the server
const start = () => {
    try {
        // connecting to database
        (0, db_1.connectDB)();
        app.listen(PORT, () => {
            console.log("Server started successfully");
        });
    }
    catch (err) {
        console.log(err);
    }
};
start();
