### ✅ Task 3-2: 

### Basic Setup & User Routes
- Express setup
- MongoDB schema for User
- Basic routes:
  - `POST /users` (to add a user)
  - `GET /users` (to get all users)

### Notes API with Logging Middleware
- Note schema with `title`, `description`, `userEmail`
- Routes:
  - `POST /notes` (to add a note)
  - `GET /notes/:email` (to get a note where email matches)
  - `DELETE /notes/:id` (to get a note where id matches)

### Middleware & Dummy Auth
- Add logging middleware
- Dummy auth: Allow access only if `headers.token == "123abc"`
- Protect `GET /notes` with this middleware

###  Testing
- Use Postman to test protected endpoints ans upload the screenshot

---