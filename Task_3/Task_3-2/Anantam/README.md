# 📝 Notes API – Express + MongoDB 

A simple and secure Notes API built using **Node.js**, **Express**, and **MongoDB**. It supports creating users and managing notes, includes basic logging, and has a protected route using a dummy token-based authentication system.

---

## 🚀 Features

- ✅ Add and retrieve users
- 📝 Create, view, and delete notes
- 🔐 Protected route for fetching notes by user email (requires token)
- 🧾 Middleware for request logging and auth

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB (local)
- Mongoose
- Postman

---

## 📂 API Endpoints

### 👤 Users

| Method | Route    | Description       |
|--------|----------|-------------------|
| POST   | `/users` | Create a new user |
| GET    | `/users` | Get all users     |

### 📝 Notes

| Method | Route           | Description                     |
|--------|------------------|--------------------------------|
| POST   | `/notes`         | Create a new note              |  
| GET    | `/notes/:email`  | Get notes by user email        |
| DELETE | `/notes/:id`     | Delete note by ID              | 

---

## 🔐 Protected Route

- `GET /notes/:email`
- Requires a token in headers:

```http
token: 123abc

If missing or wrong, you'll get:
{
  "error": "Unauthorized. Invalid or missing token."
}
🧪 Postman Testing
Tested using Postman:

✅ Add user

✅ Add note

✅ Get notes with token

✅ Unauthorized check

✅ Delete note

Screenshots available in /screenshots folder (or add yours here)

📁 Project Structure
pgsql
Copy
Edit
notes-api/
├── models/
├── routes/
├── middleware/
├── index.js
├── package.json
├── .gitignore
└── README.md
🧰 Setup
bash
Copy
Edit
git clone https://github.com/anantamtiwari/notes-api.git
cd notes-api
npm install
npm start
MongoDB must be running locally at mongodb://127.0.0.1:27017/notesdb.

🙋 Author
Built with ❤️ by Anantam 
