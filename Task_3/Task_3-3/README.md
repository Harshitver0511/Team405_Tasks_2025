### ✅ Task 3-3: 

### Setup & Auth Middleware
- Project structure (`routes`, `controllers`, `models`, `middlewares`)
- MongoDB connection via Mongoose
- User Model stores name, email, password, and additional info if required
- `POST /register` and `POST /login` with hashed passwords & JWT
- `GET /profile` protected route with JWT middleware

### CRUD with User-Todo Relation
- Todo schema with `userId` reference i.e, each Todo document is linked to a specific user in your MongoDB database using a foreign key-like reference to the User model, more specifically in todo schema 

```
userId: {
    type: mongoose.Schema.Types.ObjectId, // stores the _id of the User
    ref: "User", // refers to the User model
    required: true
  }

```

- Full CRUD:
  - `POST /todos` (to add a todo)
  - `GET /todos` (to fetch all todos)
  - `GET /todos/:id` (to get a todo with specific id)
  - `PUT /todos/:id` (to update a todo with specific id)
  - `DELETE /todos/:id` (to delete a todo with specific id)
- Token-based access using middleware (use proper jwt logic)

### Testing 
- Use Postman to test protected endpoints ans upload the screenshot


---