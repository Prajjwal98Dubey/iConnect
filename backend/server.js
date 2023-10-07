const express = require('express')
const dotenv=require('dotenv')
const chats = require('./data')
const cors = require('cors')
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const messageRoutes= require('./routes/messageRoutes')
dotenv.config()
const app = express()
app.use(cors())
connectDB()
app.use(express.json()) 
app.get('/',(req,res)=>{
    res.send("this is the server")
})

app.use('/api/users',userRoutes)
app.use('/api/chats',chatRoutes)
app.use('/api/message',messageRoutes)
PORT=process.env.PORT || 5000
const server = app.listen(PORT,console.log(`server started at ${PORT}`))
const io=require('socket.io')(server,{
    pingTimeOut:60000,
    cors:{
        origin:"http://localhost:3000"
    },
})
io.on("connection",(socket)=>{
    console.log("connected to socket.io")
})