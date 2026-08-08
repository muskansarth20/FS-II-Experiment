import { useState } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { usePosts } from "../context/PostsContext";

function Editor() {
  const { user } = useAuth();
  const { posts, addPost, editPost } = usePosts();

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
        author: user.username,
        date: new Date().toLocaleDateString(),
      });

      alert("Post Updated Successfully");
      setEditingId(null);
    } else {
      addPost({
        title,
        category,
        content,
        author: user.username,
        date: new Date().toLocaleDateString(),
      });

      alert("Post Published Successfully");
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

  return (
    <>
      <Navbar />

      <div className="admin-container">

        <h1>Editor Dashboard</h1>

        <div className="stats">

          <div className="card">
            <h2>{posts.length}</h2>
            <p>Total Posts</p>
          </div>

          <div className="card">
            <h2>{user.role}</h2>
            <p>Your Role</p>
          </div>

          <div className="card">
            <h2>Editor</h2>
            <p>Access Level</p>
          </div>

        </div>

        <form className="post-form" onSubmit={handleSubmit}>

          <h2>
            {editingId ? "Edit Your Post" : "Create New Post"}
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
            placeholder="Write your content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button type="submit">
            {editingId ? "Update Post" : "Publish Post"}
          </button>

        </form>

        <h2>All Posts</h2>

        <table>

          <thead>

            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Date</th>
              <th>Action</th>
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

                  {post.author === user.username ? (

                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(post)}
                    >
                      Edit
                    </button>

                  ) : (

                    <button
                      className="view-btn"
                      disabled
                    >
                      View Only
                    </button>

                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
    </>
  );
}

export default Editor;