import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import UserRoter from './routes/userroutes.js'
import authRouter from './routes/auth.router.js'
dotenv.config();
import cors from 'cors'

mongoose.connect(process.env.MONGO).then(() => {
    console.log("Connect to Mongo")
}).catch((err) => {
    console.log('Error' + err)
})

let app = express();
app.use(express.json())
app.use(cors())

app.listen(3000, () => {
    console.log("code is running")
})
app.use('/api/user', UserRoter)
app.use('/api/auth', authRouter)
app.use((err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Has Problem"
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})