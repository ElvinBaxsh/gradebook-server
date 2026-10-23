# GradeBook — Server

REST API for the GradeBook education platform. The frontend lives in [gradebook-client](https://github.com/ElvinBaxsh/gradebook-client).

## Tech Stack

Node.js · Express · PostgreSQL · Sequelize ORM · JWT · bcrypt · dotenv · CORS

## Getting Started

1. Create a PostgreSQL database (for example `gradebook_db`).
2. Copy `.env.example` to `.env` and fill in the values:

   ```
   PORT=5000
   DB_NAME=gradebook_db
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_HOST=localhost
   DB_PORT=5432
   JWT_SECRET=your_jwt_secret_key
   ```

3. Install and run:

   ```bash
   npm install
   npm start       # http://localhost:5000
   ```

Tables (`User`, `Lesson`, `Grade`) are created automatically with `sequelize.sync`.

## API

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | – | Register a new user (password hashed with bcrypt) |
| POST | `/api/auth/login` | – | Log in, returns a JWT |
| PUT | `/api/auth/update-profile` | JWT | Update the user's profile |
| GET | `/api/dashboard/summary` | JWT | Dashboard summary for the logged-in student |
