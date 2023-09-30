const mongoose = require('mongoose')

const userModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        default: "https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg"
    }
},
{
    timestamps:true
})

const userSchema = mongoose.model("User", userModel)

module.exports = userSchema