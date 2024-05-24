import User from '../model/userModel.js';
import jwt from 'jsonwebtoken';


export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    user = new User({ username, email, password });
    await user.save();

    const payload = { user: { id: user.id } };
    jwt.sign(payload, "c582fe3b10d7765e5f17cdf84d2d41864f0279c8b21ca76cd3cb2a7b279121db", { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.log('Error:', err);
    res.status(500).send('Server error');
  }
}