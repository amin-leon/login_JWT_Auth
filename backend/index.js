// backend/index.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const secretKey = 'Leon16061998'; // Store this securely
const authMiddleware = require('./middleware/auth');
const cors = require('cors'); // Import the cors middleware

const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://leoneandela:Leon16061998@cluster0.cnanadi.mongodb.net/login-Up', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(cors());

app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const newUser = new User({ email, password });
    await newUser.save();
    res.json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });
    if (user) {
      const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred' });
  }
});

app.get('/api/user-data', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (user) {
      res.json({ success: true, userData: user });
    } else {
      res.json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
