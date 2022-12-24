import { Router } from "express"
import { handleLogin, handleRegistration } from "./controller"

const router = Router()

router.route('/signin').post(handleLogin)

router.route('/signup').post(handleRegistration)

export default router
