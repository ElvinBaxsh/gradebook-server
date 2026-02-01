const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: "Token yoxdur, giriş qadağandır!" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'senior_az_secret_2026');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token etibarsızdır!" });
  }
};