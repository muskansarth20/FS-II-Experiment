import { useState } from "react";
import Navbar from "../components/Navbar";
import { usePosts } from "../context/PostsContext";

function Admin() {
  const { posts, addPost, editPost, deletePost } = usePosts();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !category || !content) {
      alert("Please fill all fields");
      return;
    }

    if (editingId) {
      editPost({
        id: editingId,
        title,
        category,
        content,
        author: "Admin",
        date: new Date().toLocaleDateString(),
      });

      alert("Post Updated Successfully");

      setEditingId(null);
    } else {
      addPost({
        title,
        category,
        content,
        author: "Admin",
        date: new Date().toLocaleDateString(),
      });

      alert("Post Added Successfully");
    }

    setTitle("");
    setCategory("");
    setContent("");
  };

  const handleEdit = (post) => {
    setEditingId(post.id);
    setTitle(post.title);
    setCategory(post.category);
    setContent(post.content);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (confirmDelete) {
      deletePost(id);
    }
  };

  return (
    <>
      <Navbar />

      <div className="admin-container">

        <h1>Admin Dashboard</h1>

        <div className="stats">

          <div className="card">
            <h2>{posts.length}</h2>
            <p>Total Posts</p>
          </div>

          <div className="card">
            <h2>Admin</h2>
            <p>Role</p>
          </div>

          <div className="card">
            <h2>JWT</h2>
            <p>Authenticated</p>
          </div>

        </div>

        <form className="post-form" onSubmit={handleSubmit}>

          <h2>
            {editingId ? "Edit Post" : "Create New Post"}
          </h2>

          <input
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <textarea
            rows="5"
            placeholder="Write Content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button type="submit">
            {editingId ? "Update Post" : "Publish Post"}
          </button>

        </form>

        <h2>Manage Posts</h2>

        <table>

          <thead>

            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {posts.map((post) => (

              <tr key={post.id}>

                <td>{post.id}</td>

                <td>{post.title}</td>

                <td>{post.author}</td>

                <td>{post.category}</td>

                <td>{post.date}</td>

                <td>

                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(post)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
    </>
  );
}

export default Admin;