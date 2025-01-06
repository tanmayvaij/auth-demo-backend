import { Router } from "express";
import { handleGetUser, handleLogin, handleRegistration } from "./controller";
import { validateToken } from "./middleware";

const router = Router();

router.route("/getuser").get(validateToken, handleGetUser);

router.route("/login").post(handleLogin);

router.route("/register").post(handleRegistration);

export default router;
