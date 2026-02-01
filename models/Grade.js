const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User'); // Tələbə ilə əlaqə üçün

const Grade = sequelize.define('Grade', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  subject: { type: DataTypes.STRING, allowNull: false },
  score: { type: DataTypes.INTEGER, allowNull: false },
  gradeType: { type: DataTypes.STRING, defaultValue: 'Quiz' }, // Quiz, Midterm, Final
  studentId: {
    type: DataTypes.INTEGER,
    references: { model: 'users', key: 'id' } // Hansı tələbənin qiymətidir?
  }
}, {
  tableName: 'grades',
  timestamps: true
});

module.exports = Grade;