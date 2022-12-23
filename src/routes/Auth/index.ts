import { Router } from "express"
import { handleSignin, handleSignup } from "./controller"

const router = Router()

router.route('/signin').post(handleSignin)

router.route('/signup').post(handleSignup)

export default router
