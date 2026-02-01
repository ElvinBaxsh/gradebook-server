const express = require('express');
const Grade = require('../models/Grade');
const User = require('../models/User');
const router = express.Router();

// 1. Qiymət Əlavə Et (Müəllim üçün)
router.post('/add', async (req, res) => {
  try {
    const { studentId, taskName, score, feedback } = req.body;
    const newGrade = await Grade.create({ studentId, taskName, score, feedback });
    res.status(201).json({ message: "Qiymət yazıldı!", newGrade });
  } catch (error) {
    res.status(500).json({ message: "Xəta baş verdi." });
  }
});

// 2. Tələbənin Öz Qiymətlərini Görməsi
router.get('/my-grades/:studentId', async (req, res) => {
  try {
    const grades = await Grade.findAll({ where: { studentId: req.params.studentId } });
    res.json(grades);
  } catch (error) {
    res.status(500).json({ message: "Qiymətlər gətirilərkən xəta." });
  }
});

module.exports = router;