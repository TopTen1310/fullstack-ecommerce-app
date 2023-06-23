import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'

// @desc   all users
// @route  GET api/user/
// @access Private
export const allUsers = asyncHandler(async (req, res) => {
    const allUsers = await User.find({}, { password: 0 })
    res.status(200).json(allUsers)
})

// @desc   update user
// @route  PUT api/user/:userId
// @access Private
export const updateUser = asyncHandler(async (req, res) => {
    const { userId } = req.params
    const { name, email, oldPass, newPass, image, imageName } = req.body

    if (oldPass) {
        const user = await User.findById(userId)
        const hash = user.password
        const checkPassword = bcrypt.compareSync(oldPass, hash);
        if (!checkPassword) {
            res.status(400)
            throw new Error('Old password is wrong')
        }
    }

    let thingsToUpdate = {}

    if (name) thingsToUpdate.name = name
    if (email) thingsToUpdate.email = email
    if (newPass) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(newPass, salt);
        thingsToUpdate.password = hash
    }
    if (image) {
        thingsToUpdate.image = image
        thingsToUpdate.imageName = imageName
    }

    const newUser = await User.findOneAndUpdate({ _id: userId }, { $set: thingsToUpdate }, { new: true, runValidators: true })
    const { password, isAdmin, ...other } = newUser._doc
    const token = req.cookies.access_token
    res.cookie('access_token', token, {
        httpOnly: true,
        expires: new Date(new Date().getTime() + (86409000 / 15))
    })
    res.cookie('clientData', JSON.stringify(other), {
        expires: new Date(new Date().getTime() + (86409000 / 15))
    })
    res.status(200).json(other)
})

// @desc   delete a user
// @route  DELETE api/user/:userId
// @access Private
export const deleteUser = asyncHandler(async (req, res) => {
    const { userId } = req.params
    await User.deleteOne({ _id: userId })
    res.status(200).json({ id: userId, message: 'Deleted successfully' })
})