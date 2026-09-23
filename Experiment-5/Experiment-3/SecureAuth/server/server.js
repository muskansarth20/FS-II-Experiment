import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";

const app = express();

const PORT = 5000;


// Middleware
app.use(cors());

app.use(express.json());


// Test route
app.get("/", (req, res) => {
  res.json({
    message: "SecureAuth Backend is running 🚀",
  });
});


// Authentication routes
app.use(
  "/api/auth",
  authRoutes
);


// Post routes
app.use(
  "/api/posts",
  postRoutes
);


// Start server
app.listen(PORT, () => {
  console.log(
    `SecureAuth Backend running at http://localhost:${PORT}`
  );
});