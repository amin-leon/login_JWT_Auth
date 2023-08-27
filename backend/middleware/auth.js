const jwt = require('jsonwebtoken');
const secretKey = 'Leon16061998'; // Use the same secret key as before

module.exports = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ success: false, message: 'Access denied' });

  try {
    const decoded = jwt.verify(token, secretKey);
    req.userId = decoded.userId; // Set the authenticated user's ID
    next();
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid token' });
  }
};
