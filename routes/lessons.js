const express = require('express');
const Lesson = require('../models/Lesson');
const router = express.Router();

// 1. Yeni dərs əlavə et (Admin/Müəllim üçün)
router.post('/add', async (req, res) => {
  try {
    const { topic, lessonDate, zoomLink, groupName } = req.body;
    const newLesson = await Lesson.create({ topic, lessonDate, zoomLink, groupName });
    res.status(201).json({ message: "Dərs cədvələ əlavə edildi!", newLesson });
  } catch (error) {
    res.status(500).json({ message: "Xəta baş verdi.", error: error.message });
  }
});

// 2. Qrupa görə cədvəli gətir (Tələbə üçün)
router.get('/group/:groupName', async (req, res) => {
  try {
    const lessons = await Lesson.findAll({ 
      where: { groupName: req.params.groupName },
      order: [['lessonDate', 'ASC']] // Tarixə görə sıralayır
    });
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ message: "Cədvəl gətirilərkən xəta." });
  }
});

module.exports = router;