import OpenAI from 'openai';
import Chat from '../model/chatModel.js';



const openai = new OpenAI({
  // apiKey: process.env.OPENAI_API_KEY,
});

const rateLimitWindow = 1000 * 60; // One minute in milliseconds
let lastRequestTime = 0;
export const createChat = async (req, res) => {
  try {
    const now = Date.now();
    if (now - lastRequestTime < rateLimitWindow) {
      return res.status(429).json({ message: 'Rate limit exceeded, please try again later.' });
    }
    lastRequestTime = now;
    const { message } = req.body;
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo ',
      messages: [{ role: 'user', content: message }],
    });
    const chatResponse = response.choices[0].message.content;1
    const chat = await Chat.findOne({ user: req.user.id });
    if (!chat) {
      const newChat = new Chat({
        user: req.user.id,
        conversation: [{ message, response: chatResponse }],
      });
      await newChat.save();
      return res.json(newChat);
    } else {
      chat.conversation.push({ message, response: chatResponse });
      await chat.save();
      return res.json(chat);
    }
  } catch (err) {
    console.error(err);
    if (err.code === 'insufficient_quota') {
      return res.status(429).json({ message: 'OpenAI API quota exceeded.' });
    }
    res.status(500).send('Server error');
  }
}

export const getChats = async (req, res) => {
  try {
    const chats = await Chat.find({ user: req.user.id });
    res.json(chats);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
}
