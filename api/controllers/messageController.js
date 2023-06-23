import asyncHandler from 'express-async-handler'
import Message from '../models/contactModel.js'
import User from '../models/userModel.js'

// @desc   Storing message
// @route  POST api/message/:userId
// @access Private
export const storeMessage = asyncHandler(async (req, res) => {
    const { name, email, number, message } = req.body
    const id = req.user.id
    const user = await User.findById(id)
    if (user.email !== email) {
        res.status(400)
        throw new Error('Invalid mail address')
    }
    const storeMessage = new Message({ name, email, number, message, userId: id })
    await storeMessage.save()
    res.status(201).json({ message: 'Successfully sent' })
})

// @desc   get all message
// @route  GET api/message/
// @access Private
export const allMessages = asyncHandler(async (req, res) => {
    const messages = await Message.find().sort({ createdAt: -1 })
    res.status(200).json(messages)
})

// @desc   delete a message
// @route  DELETE api/message/:messageId
// @access Private
export const deleteMessage = asyncHandler(async (req, res) => {
    const { messageId } = req.params
    await Message.deleteOne({ _id: messageId })
    res.status(200).json({ messageId, message: 'Successfully deleted' })
})