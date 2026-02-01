const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  fullName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false, validate: { isEmail: true } },
  password: { type: DataTypes.TEXT, allowNull: false },
  avatar: { type: DataTypes.TEXT, allowNull: true }
}, {
  tableName: 'users',
  timestamps: true
});

module.exports = User;