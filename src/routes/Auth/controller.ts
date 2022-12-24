import { Request, Response } from "express"
import { genSalt, hash } from "bcrypt"
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

        res.json(authtoken)

    }

    catch (err) {
        console.log(err)
    }

}


export const handleLogin = (req: Request, res: Response) => {

}
