import express from "express";

import posts from "../data/posts.js";

import {
  authenticateToken,
} from "../middleware/authMiddleware.js";

import {
  authorizeRoles,
} from "../middleware/roleMiddleware.js";

const router = express.Router();


// ========================================
// GET ALL POSTS
// Admin + Editor + Viewer
// ========================================

router.get(
  "/",
  authenticateToken,
  (req, res) => {
    res.json(posts);
  }
);


// ========================================
// CREATE POST
// Admin + Editor
// ========================================

router.post(
  "/",
  authenticateToken,
  authorizeRoles("Admin", "Editor"),
  (req, res) => {

    const {
      title,
      content,
      category,
    } = req.body;

    if (!title || !content || !category) {
      return res.status(400).json({
        message:
          "Title, content and category are required.",
      });
    }

    const newPost = {
      id:
        posts.length > 0
          ? Math.max(...posts.map((p) => p.id)) + 1
          : 1,

      title,
      content,
      category,

      author: req.user.username,

      date: new Date()
        .toLocaleDateString("en-GB")
        .replace(/\//g, "-"),
    };

    posts.push(newPost);

    res.status(201).json({
      message: "Post created successfully.",
      post: newPost,
    });
  }
);


// ========================================
// EDIT POST
//
// Admin → any post
// Editor → own posts
// Viewer → denied
// ========================================

router.put(
  "/:id",
  authenticateToken,
  async (req, res) => {

    const id = Number(req.params.id);

    const post = posts.find(
      (p) => p.id === id
    );

    if (!post) {
      return res.status(404).json({
        message: "Post not found.",
      });
    }

    // Viewer cannot edit
    if (req.user.role === "Viewer") {
      return res.status(403).json({
        message: "Viewer cannot edit posts.",
      });
    }

    // Editor can edit only own posts
    if (
      req.user.role === "Editor" &&
      post.author !== req.user.username
    ) {
      return res.status(403).json({
        message:
          "Editor can edit only their own posts.",
      });
    }

    post.title =
      req.body.title ?? post.title;

    post.content =
      req.body.content ?? post.content;

    post.category =
      req.body.category ?? post.category;

    res.json({
      message: "Post updated successfully.",
      post,
    });
  }
);


// ========================================
// DELETE POST
// Admin only
// ========================================

router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles("Admin"),
  (req, res) => {

    const id = Number(req.params.id);

    const index = posts.findIndex(
      (p) => p.id === id
    );

    if (index === -1) {
      return res.status(404).json({
        message: "Post not found.",
      });
    }

    posts.splice(index, 1);

    res.json({
      message: "Post deleted successfully.",
    });
  }
);


export default router;