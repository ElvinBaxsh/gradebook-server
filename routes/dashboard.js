const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Lesson = require('../models/Lesson');
const Grade = require('../models/Grade');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/summary', authMiddleware, async (req, res) => {
  try {
    // Terminalda yoxla: req.user dolu gəlir?
    // console.log("Dashboard müraciəti edən user ID:", req.user.id);

    const studentId = req.user.id;

    // 1. İstifadəçini bazadan tap
    const user = await User.findByPk(studentId, {
      attributes: ['fullName', 'avatar']
    });

    if (!user) {
      return res.status(404).json({ message: "İstifadəçi tapılmadı." });
    }

    // 2. Bugünkü dərslər
    const today = new Date().toISOString().split('T')[0];
    const lessons = await Lesson.findAll({
      where: { lessonDate: today },
      order: [['startTime', 'ASC']]
    });

    // 3. Qiymətlər
    const grades = await Grade.findAll({
      where: { studentId },
      limit: 5,
      order: [['createdAt', 'DESC']]
    });

    res.json({
      user,
      lessons,
      grades,
      stats: { assignmentsCount: 12, missingClasses: 2, upcomingTests: [] }
    });

  } catch (error) {
    console.error("Dashboard Server Xətası:", error);
    res.status(500).json({ message: "Məlumatlar gətirilərkən daxili xəta baş verdi." });
  }
});

module.exports = router;