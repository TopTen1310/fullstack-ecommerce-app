import express from 'express';
import { getCategories, createCategory } from '../controllers/categoryController.js';
import { verifyAdmin } from '../middleware/tokenMiddleware.js';
const router = express.Router();

router.get('/', getCategories)
router.post('/create', verifyAdmin, createCategory)

export default router