import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import auth from './routes/auth.js';
import chat from './routes/chat.js';
dotenv.config(); // Load environment variables before using them

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/sqlSoluationCompanyTask")
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/auth', auth);
app.use('/chat', chat);
app.get('/', (req, res) => {
  res.send('Server is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
