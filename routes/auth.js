const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // Mövcud bcryptjs kitabxanası
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware'); // Middleware-i import edirik

// --- REGISTER ---
router.post('/register', async (req, res) => {
  try {
    const { fullName, email, password, avatar } = req.body;
    const userExist = await User.findOne({ where: { email } });
    if (userExist) return res.status(400).json({ message: "Bu email artıq istifadə olunur." });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ fullName, email, password: hashedPassword, avatar });

    res.status(201).json({ message: "Qeydiyyat uğurludur!", userId: newUser.id });
  } catch (err) {
    res.status(500).json({ message: "Server xətası: " + err.message });
  }
});

// --- LOGIN ---
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    
    if (!user) return res.status(404).json({ message: "İstifadəçi tapılmadı!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Şifrə yanlışdır!" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'senior_az_secret_2026',
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: { id: user.id, fullName: user.fullName, email: user.email, avatar: user.avatar }
    });
  } catch (err) {
    res.status(500).json({ message: "Giriş xətası: " + err.message });
  }
});

// --- UPDATE PROFILE (YENİ ƏLAVƏ) ---
router.put('/update-profile', authMiddleware, async (req, res) => {
  try {
    const { fullName, avatar, password } = req.body;
    
    // AuthMiddleware-dən gələn id vasitəsilə istifadəçini tapırıq
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "İstifadəçi tapılmadı!" });
    }

    // Məlumatları yeniləyirik
    if (fullName) user.fullName = fullName;
    if (avatar) user.avatar = avatar;

    // Əgər şifrə sahəsi doldurulubsa, onu hash-ləyib yadda saxlayırıq
    if (password && password.trim() !== "") {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    // Yenilənmiş məlumatları geri qaytarırıq (şifrəsiz)
    res.json({
      message: "Profil uğurla yeniləndi!",
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        avatar: user.avatar
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Yeniləmə xətası: " + err.message });
  }
});

module.exports = router;