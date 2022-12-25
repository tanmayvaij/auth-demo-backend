import { Request, Response } from "express"
import { genSalt, hash, compare } from "bcrypt"
import { sign } from "jsonwebtoken"
import { UserSchema } from "./schema"


export const handleRegistration = async (req: Request, res: Response) => {
    
   const { name, number, email, address, password, cpassword } = req.body

    if (
        name == "" || 
        number == "" || 
        email == "" || 
        address == "" || 
        password == "" || 
        cpassword == "" 
    ) {
        return res.json({ status: false, message: "required fields are empty" })
    }

   if ( password != cpassword ) 
        return res.json({ status: false, message: "passwords mismatch" })

    const userExists = await UserSchema.findOne({ email })

    if (userExists)
        return res.json({ status: false, message: `user with email ${email} already exists` })
    
    const salt = await genSalt(10)
    const hashedPassword = await hash(password, salt)

    try {

        const user = await UserSchema.create({
            name, number, email, address, password: hashedPassword
        })

        const payload = {
            name: user.name,
            number: user.number,
            email: user.email,
            address: user.address
        }

        const authtoken = sign(payload, process.env.JWT_SECRET as string)

        res.json({ success: true, authtoken })

    }

    catch (err) {
        console.log(err)
    }

}


export const handleLogin = async (req: Request, res: Response) => {

    const { email, password } = req.body

    if ( email == "" || password == "" )
        return res.json({ status: false, message: "missing fields" })

    const user = await UserSchema.findOne({ email })

    if (!user) return res.json({ status: false, message: "invalid credentials" })

    const match = await compare(password, user?.password as string)

    if (!match) return res.json({ status: false, message: "invalid credentials" })

    const payload = {
        name: user.name,
        number: user.number,
        email: user.email,
        address: user.address
    }

    const authtoken = sign(payload, process.env.JWT_SECRET as string)

    res.json({ success: true, authtoken })
    
}


export const handleGetUser = (req: Request, res: Response) => {

    const user = req.user

    res.json({ user })

}
