// top level imports
import express from "express"
import { config } from "dotenv"
import cors from "cors"
import { connectDB } from "./db"


const app = express()
const PORT = process.env.PORT || 5000


// enabled all environment variables
config()


// server settings
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())


// importing all routers 
import AuthRouter from "./routes/Auth"


// using all routers
app.use('/api/auth', AuthRouter)


// starting the server
const start = () => {

    try {

        // connecting to database
        connectDB()

        app.listen(PORT, () => {
            console.log("Server started successfully")
        })        

    }

    catch (err) { console.log(err) }

}

start()
