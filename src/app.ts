import express from "express"
import { connectDB } from "./db"


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
