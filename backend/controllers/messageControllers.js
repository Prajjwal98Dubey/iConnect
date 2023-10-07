const asyncHandler = require('express-async-handler')
const Message = require('../models/messageModel')
const Chat = require('../models/chatModel')
const userSchema = require('../models/userSchema')
const { populate } = require('dotenv')

const sendMessage = asyncHandler((async (req, res) => {
    const { content, chatId } = req.body
    if (!content || !chatId) {
        console.log("Invalid data ")
        return res.sendStatus(400)
    }
    var newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId
    }
    try {
        var message = await Message.create(newMessage);

        message = await message.populate("sender", "name photo");
        message = await message.populate("chat");
        message = await userSchema.populate(message, {
            path: "chat.users",
            select: "name photo email",
        });

        await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

        res.json(message);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
}))

const allMessages = asyncHandler(async(req, res) => {

    try {
        const message = await Message.find({ chat: req.params.chatId }).populate("sender", "name photo").populate("chat")
        res.json(message)
    }
    catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})


module.exports = { sendMessage, allMessages }