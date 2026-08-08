import express from "express";
import jwt from "jsonwebtoken";

import users from "../data/users.js";
import { SECRET_KEY } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "Username and password are required.",
    });
  }

  const user = users.find(
    (u) =>
      u.username === username &&
      u.password === password
  );

  if (!user) {
    return res.status(401).json({
      message: "Invalid username or password.",
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role,
    },
    SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );

  res.json({
    message: "Login successful",

    token,

    user: {
      id: user.id,
      username: user.username,
      role: user.role,
    },
  });
});

export default router;