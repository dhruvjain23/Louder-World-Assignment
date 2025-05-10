import express from 'express'
import dotenv from 'dotenv'
import eventRoutes from './Routes/eventRoutes.js'
import cors from 'cors'

dotenv.config();
const app=express();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use('/api',eventRoutes)

app.listen(process.env.PORT,()=>{
    console.log("Server is running on the port ",process.env.PORT)
})
