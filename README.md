# GradeBook — Server

REST API for the GradeBook education platform. The frontend lives in [gradebook-client](https://github.com/ElvinBaxsh/gradebook-client).

## Features

- User registration and login with **JWT authentication**
- Passwords hashed with bcrypt
- Protected routes with auth middleware
- Student dashboard summary
- PostgreSQL database with Sequelize models (User, Lesson, Grade); tables are created automatically

## Tech Stack

Node.js · Express · PostgreSQL · Sequelize ORM · JWT · bcrypt

## Getting Started

You need Node.js and a PostgreSQL database. Copy `.env.example` to `.env`, add your database settings, then run:

```bash
npm install
npm start
```

## API

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | – | Register a new user |
| POST | `/api/auth/login` | – | Log in, returns a JWT |
| PUT | `/api/auth/update-profile` | JWT | Update the user's profile |
| GET | `/api/dashboard/summary` | JWT | Dashboard summary for the logged-in student |
