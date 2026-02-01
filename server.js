require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
// const User = require('./models/User'); // Bu mütləq olmalıdır ki, Sequelize cədvəli tanısın
// const Lesson = require('./models/Lesson');
// const Grade = require('./models/Grade');

// Modelləri import edirik (Baza sinxronizasiyası üçün)
const User = require('./models/User');
const Lesson = require('./models/Lesson');
const Grade = require('./models/Grade');

// Marşrutlar
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // Və ya sənin Frontend portun (məs: 3000)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '50mb' }));

// API Yolları
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);

const PORT = process.env.PORT || 5000;

// sequelize.sync({ alter: true }) bütün cədvəlləri (User, Lesson, Grade) bir yerdə yaradacaq
sequelize.sync({ alter: true }).then(() => {
  console.log('Bütün cədvəllər (User, Lesson, Grade) sinxronizasiya olundu! ✅');
  app.listen(PORT, () => console.log(`Server ${PORT} portunda tam gücü ilə işləyir... 🚀`));
}).catch(err => console.log('Baza Xətası: ' + err));