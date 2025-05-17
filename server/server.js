const express = require("express");
const cors = require("cors");
const connectDB = require("./Database");
const dotenv = require("dotenv");
const { UserRoute } = require("./routes/userRoutes");
const { booksRoutes } = require("./routes/bookRoutes");

const app = express();
dotenv.config();

connectDB();

app.use(
  cors({
    origin: [
      "http://localhost:5050",
      "http://localhost:5173",
      process.env.FRONTEND_URL,
    ],
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to Book store ..");
});

app.use("/api/auth", UserRoute);
app.use("/api/mybooks", booksRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
