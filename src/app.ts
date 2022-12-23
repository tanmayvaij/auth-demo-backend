import express from "express"

const app = express()
const PORT = process.env.PORT || 5000

import AuthRouter from "./routes/Auth"

app.use('/api/auth', AuthRouter)

app.listen(PORT, ()=>{
    console.log("Server started successfully")
})
