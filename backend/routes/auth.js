import express from 'express';
import { register } from '../auth/register.js';
import { login } from '../auth/login.js';

const router = express.Router();

router.post('/register',register)

router.post("/login",login)

export default router