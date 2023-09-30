const express = require('express')
const dotenv=require('dotenv')
const chats = require('./data')
const cors = require('cors')
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')

dotenv.config()
const app = express()
app.use(cors())
connectDB()
app.use(express.json()) 
app.get('/',(req,res)=>{
    res.send("this is the server")
})

app.use('/api/users',userRoutes)
// app.user('/api/chats',chatRoutes)
PORT=process.env.PORT || 5000
app.listen(PORT,console.log(`server started at ${PORT}`))