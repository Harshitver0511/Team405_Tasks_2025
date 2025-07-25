const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/users", userRoutes);
app.use("/notes", noteRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/notesdb")

.then(() => {
  console.log("✅ MongoDB Connected");
  app.listen(5000, () => console.log("🚀 Server started on port 5000"));
})
.catch(err => console.error("MongoDB Connection Error:", err));
