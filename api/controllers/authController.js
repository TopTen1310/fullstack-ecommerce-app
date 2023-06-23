import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
// import { v1 } from 'uuid'

// @desc   Register user
// @route  POST api/auth/register
// @access Public
export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, image, imageName } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please fill all the input fields')
    }

    const checkUser = await User.countDocuments({ email })
    if (checkUser) {
        res.status(400)
        throw new Error('User already exists')
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    let newUser = new User({
        name,
        email,
        password: hash
    })

    if (image) {
        newUser.image = image
        newUser.imageName = imageName
    }

    newUser = await newUser.save()
    res.status(201).json({ userId: newUser._id })
})

// @desc   Login user
// @route  POST api/auth/login
// @access Public
export const loginUser = asyncHandler(async (req, res) => {
    const { email, pass } = req.body

    if (!email || !pass) {
        res.status(400)
        throw new Error('Please fill all the input fields')
    }

    const user = await User.findOne({ email })
    if (!user) {
        res.status(400)
        throw new Error('Invalid email')
    }

    const hash = user.password
    const checkPassword = bcrypt.compareSync(pass, hash);
    if (!checkPassword) {
        res.status(400)
        throw new Error('Password is wrong')
    }

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET)

    const { password, isAdmin, ...other } = user._doc
    res.cookie('access_token', token, {
        httpOnly: true,
        expires: new Date(new Date().getTime() + (86409000 / 15))
    })
    res.cookie('clientData', JSON.stringify(other), {
        expires: new Date(new Date().getTime() + (86409000 / 15))
    })
    res.status(200).json(other)
})

// @desc   Login admin
// @route  POST api/auth/login
// @access Public
export const loginAdmin = asyncHandler(async (req, res) => {
    const { email, pass } = req.body

    if (!email || !pass) {
        res.status(400)
        throw new Error('Please fill all the input fields')
    }

    const user = await User.findOne({ email })

    if (!user || !bcrypt.compareSync(pass, user.password) || !user.isAdmin) {
        res.status(401)
        throw new Error('Invalid credentials')
    }

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET)

    const { password, isAdmin, ...other } = user._doc
    res.cookie('access_token', token, {
        httpOnly: true,
        expires: new Date(new Date().getTime() + (86409000 / 15))
    })
    res.cookie('clientData', JSON.stringify(other), {
        expires: new Date(new Date().getTime() + (86409000 / 15))
    })
    res.status(200).json(other)
})

// @desc   Logout user
// @route  GET api/auth/logout
// @access Public
export const logoutUser = (req, res) => {
    res.clearCookie('access_token')
    res.clearCookie('clientData')
    res.status(200).json({ message: 'successfully logged out' })
}