import { Router } from "express"
import { handleGetUser, handleLogin, handleRegistration } from "./controller"
import { validateToken } from "./middleware"

const router: Router = Router()

router.route('/getuser').get(validateToken, handleGetUser)

router.route('/signin').post(handleLogin)

router.route('/signup').post(handleRegistration)

export default router
