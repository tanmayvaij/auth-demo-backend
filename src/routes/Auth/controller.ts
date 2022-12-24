import { Request, Response } from "express"
import { genSalt, hash } from "bcrypt"
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

    const user = await UserSchema.create({
        name, number, email, address, password: hashedPassword
    })

    

}

export const handleLogin = (req: Request, res: Response) => {

}
