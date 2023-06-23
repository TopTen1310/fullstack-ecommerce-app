import express from 'express'
import { registerUser, loginUser, logoutUser, loginAdmin } from '../controllers/authController.js'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/adminLogin', loginAdmin)
router.get('/logout', logoutUser)

export default router