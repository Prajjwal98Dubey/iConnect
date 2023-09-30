const asyncHandler = require('express-async-handler')
const User = require('../models/userSchema')
const generateToken = require('../config/generateTokens')
const bcrypt = require('bcrypt')
const registerUser = asyncHandler(async (req,res) => {
    const { name, email, password,photo } = req.body
    if(!name ||  !email || !password){
        res.send(400)
        throw new Error("Enter all fields!!")
    }
    const userExists = await User.findOne({email})
    if (userExists){
        res.status(400)
        throw new Error("User Exists")
    }
    const user = await User.create({
        name,email,password,photo
    })
    const salt = await bcrypt.genSalt(10)
    user.password=await bcrypt.hash(user.password,salt)
    user.save()
    if (user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            password:user.password,
            photo:user.photo,
            token:generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error("Failed to create the user")
    }

})
const authUser=asyncHandler(async(req,res)=>{
    const{email,password}= req.body
    const userExist=await User.findOne({email})
    if(!userExist){
        res.status(404)
        throw new Error("User does not exists.")
    }
    if (!await bcrypt.compare(password,userExist.password)){
        res.status(400)
        throw new Error("Invalid Credentials")
    }

    res.status(201).json({
        _id: userExist._id,
        name: userExist.name,
        email: userExist.email,
        isAdmin: userExist.isAdmin,
        photo: userExist.photo,
        token: generateToken(userExist._id),
    })
}
)
// /api/users?search=virat
const allUsers=asyncHandler(async(req,res)=>{
    const keyword = req.query.search ?{
        $or:[
            {name:{$regex:req.query.search,$options:"i"}},
            {email:{$regex:req.query.search,$options:"i"}}
        ]
    } : {};
    const users = await User.find(keyword).find({_id:{$ne:req.user._id}})
    res.send(users)

} 
)

module.exports={registerUser,authUser,allUsers}