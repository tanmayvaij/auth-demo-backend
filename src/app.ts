import express from "express"
import { config } from "dotenv"
import { connectDB } from "./db"


config()


const app = express()
const PORT = process.env.PORT || 5000


app.use(express.urlencoded({ extended: true }))
app.use(express.json())


import AuthRouter from "./routes/Auth"


app.use('/api/auth', AuthRouter)


const start = () => {

    try {

        connectDB()

        app.listen(PORT, () => {
            console.log("Server started successfully")
        })        

    }

    catch (err) { console.log(err) }

}

start()
