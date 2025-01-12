import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connect to Mongo")
}).catch((err)=>{
    console.log('Error' + err)
})

let app = express();

app.listen(3000, ()=>{
    console.log("code is running")
})