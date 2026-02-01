const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Lesson = sequelize.define('Lesson', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  startTime: { type: DataTypes.STRING, allowNull: false }, // Məs: "09:00"
  endTime: { type: DataTypes.STRING, allowNull: false },
  roomNumber: { type: DataTypes.STRING, allowNull: true },
  lessonDate: { type: DataTypes.DATEONLY, allowNull: false }, // Məs: "2026-01-29"
  teacherName: { type: DataTypes.STRING, allowNull: true }
}, {
  tableName: 'lessons',
  timestamps: true
});

module.exports = Lesson;