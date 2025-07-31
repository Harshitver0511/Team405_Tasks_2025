# Sujay Notes App

A simple Node.js/Express app for managing users and notes, using MongoDB and Mongoose.

## Features
- User registration (with duplicate email check)
- Note creation and listing
- RESTful API structure

## Setup
1. **Clone the repository**
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Create a `.env` file** in the root directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/sujay-notes-app
   PORT=3000
   ```
4. **Start the server:**
   ```bash
   npm run dev
   # or
   npm start
   ```

## API Endpoints
- `POST /users/register` — Register a new user
- `GET /users` — List all users
- `POST /notes` — Create a new note
- `GET /notes` — List all notes
- `GET /hello` — Health check

## License
ISC 