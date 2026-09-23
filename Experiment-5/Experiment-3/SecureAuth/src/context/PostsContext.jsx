import { createContext, useContext, useState } from "react";
import initialPosts from "../utils/posts";
import { useAuth } from "./AuthContext";

const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState(initialPosts);

  const { user } = useAuth();

  // ================================
  // ADD POST
  // Admin and Editor can add posts
  // Viewer cannot
  // ================================
  const addPost = (post) => {
    if (!user) {
      return {
        success: false,
        message: "You must be logged in.",
      };
    }

    if (user.role === "Viewer") {
      return {
        success: false,
        message: "Viewer is not allowed to create posts.",
      };
    }

    const newPost = {
      ...post,
      id:
        posts.length > 0
          ? Math.max(...posts.map((p) => p.id)) + 1
          : 1,

      // Automatically make the logged-in user the author
      author: user.username,
    };

    setPosts((prev) => [...prev, newPost]);

    return {
      success: true,
      message: "Post created successfully.",
    };
  };

  // ================================
  // EDIT POST
  //
  // Admin → can edit any post
  // Editor → can edit only their own post
  // Viewer → cannot edit
  // ================================
  const editPost = (updatedPost) => {
    if (!user) {
      return {
        success: false,
        message: "You must be logged in.",
      };
    }

    const existingPost = posts.find(
      (post) => post.id === updatedPost.id
    );

    if (!existingPost) {
      return {
        success: false,
        message: "Post not found.",
      };
    }

    // Viewer cannot edit
    if (user.role === "Viewer") {
      return {
        success: false,
        message: "Viewer is not allowed to edit posts.",
      };
    }

    // Editor can edit only their own posts
    if (
      user.role === "Editor" &&
      existingPost.author !== user.username
    ) {
      return {
        success: false,
        message: "Editor can edit only their own posts.",
      };
    }

    // Admin can edit anything
    setPosts((prev) =>
      prev.map((post) =>
        post.id === updatedPost.id
          ? {
              ...post,
              ...updatedPost,
              // Don't allow changing the original author
              author: post.author,
            }
          : post
      )
    );

    return {
      success: true,
      message: "Post updated successfully.",
    };
  };

  // ================================
  // DELETE POST
  //
  // Admin → can delete any post
  // Editor → cannot delete
  // Viewer → cannot delete
  // ================================
  const deletePost = (id) => {
    if (!user) {
      return {
        success: false,
        message: "You must be logged in.",
      };
    }

    const existingPost = posts.find(
      (post) => post.id === id
    );

    if (!existingPost) {
      return {
        success: false,
        message: "Post not found.",
      };
    }

    // Only Admin can delete
    if (user.role !== "Admin") {
      return {
        success: false,
        message: "Only Admin can delete posts.",
      };
    }

    setPosts((prev) =>
      prev.filter((post) => post.id !== id)
    );

    return {
      success: true,
      message: "Post deleted successfully.",
    };
  };

  return (
    <PostsContext.Provider
      value={{
        posts,
        addPost,
        editPost,
        deletePost,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => {
  return useContext(PostsContext);
};