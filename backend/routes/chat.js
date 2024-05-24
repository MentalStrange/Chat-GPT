import express from 'express'
import { createChat, getChats } from '../controller/chatController.js'
import { auth } from '../middleware/authMiddleware.js'


const router = express.Router()

router.post('/',auth, createChat)
router.get('/',auth, getChats)

export default router;