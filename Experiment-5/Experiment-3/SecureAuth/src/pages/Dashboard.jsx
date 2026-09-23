import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { usePosts } from "../context/PostsContext";
import Navbar from "../components/Navbar";

function Dashboard() {
  const { user } = useAuth();

  const {
    posts,
    addPost,
    editPost,
    deletePost,
  } = usePosts();

  const [showForm, setShowForm] = useState(false);

  const [editingPost, setEditingPost] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
  });

  const [message, setMessage] = useState("");

  // ========================================
  // CHECK PERMISSIONS
  // ========================================

  const canCreate =
    user?.role === "Admin" ||
    user?.role === "Editor";

  const canDelete =
    user?.role === "Admin";

  // ========================================
  // CHECK WHETHER USER CAN EDIT A POST
  // ========================================

  const canEdit = (post) => {
    // Admin can edit everything
    if (user?.role === "Admin") {
      return true;
    }

    // Editor can edit only their own posts
    if (
      user?.role === "Editor" &&
      post.author === user.username
    ) {
      return true;
    }

    return false;
  };

  // ========================================
  // OPEN ADD FORM
  // ========================================

  const handleAddClick = () => {
    setEditingPost(null);

    setFormData({
      title: "",
      content: "",
      category: "",
    });

    setMessage("");

    setShowForm(true);
  };

  // ========================================
  // OPEN EDIT FORM
  // ========================================

  const handleEditClick = (post) => {
    if (!canEdit(post)) {
      setMessage(
        "You are not allowed to edit this post."
      );
      return;
    }

    setEditingPost(post);

    setFormData({
      title: post.title,
      content: post.content,
      category: post.category,
    });

    setMessage("");

    setShowForm(true);
  };

  // ========================================
  // FORM INPUT
  // ========================================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ========================================
  // SUBMIT FORM
  // ========================================

  const handleSubmit = (e) => {
    e.preventDefault();

    let result;

    if (editingPost) {
      result = editPost({
        ...editingPost,
        ...formData,
      });
    } else {
      result = addPost(formData);
    }

    setMessage(result.message);

    if (result.success) {
      setShowForm(false);

      setEditingPost(null);

      setFormData({
        title: "",
        content: "",
        category: "",
      });
    }
  };

  // ========================================
  // DELETE POST
  // ========================================

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }

    const result = deletePost(id);

    setMessage(result.message);
  };

  return (
    <>
      <Navbar />

      <main className="page-container">

        {/* ===============================
            HEADER
        =============================== */}

        <div className="dashboard-header">

          <h1>Dashboard</h1>

          <p>
            Welcome back,{" "}
            <strong>{user?.username}</strong> 👋
          </p>

        </div>


        {/* ===============================
            ROLE CARDS
        =============================== */}

        <div className="dashboard-cards">

          <div className="dashboard-card">

            <h3>Total Posts</h3>

            <p className="value">
              {posts.length}
            </p>

            <p className="description">
              Available posts
            </p>

          </div>


          <div className="dashboard-card">

            <h3>Your Role</h3>

            <p className="value">
              {user?.role}
            </p>

            <p className="description">
              Access level
            </p>

          </div>


          <div className="dashboard-card">

            <h3>Permissions</h3>

            <p className="value">

              {user?.role === "Admin"
                ? "Full"
                : user?.role === "Editor"
                ? "Edit"
                : "View"}

            </p>

            <p className="description">
              Current access
            </p>

          </div>

        </div>


        {/* ===============================
            PERMISSION INFORMATION
        =============================== */}

        <section className="user-info">

          <h2>
            Your Permissions
          </h2>

          <div className="user-info-row">

            <span className="user-info-label">
              View Posts
            </span>

            <span className="status-valid">
              ✓ Allowed
            </span>

          </div>


          <div className="user-info-row">

            <span className="user-info-label">
              Create Posts
            </span>

            <span>

              {canCreate ? (
                <span className="status-valid">
                  ✓ Allowed
                </span>
              ) : (
                <span className="role-badge">
                  Read Only
                </span>
              )}

            </span>

          </div>


          <div className="user-info-row">

            <span className="user-info-label">
              Edit Posts
            </span>

            <span>

              {user?.role === "Admin" ? (
                <span className="status-valid">
                  ✓ All Posts
                </span>
              ) : user?.role === "Editor" ? (
                <span className="status-valid">
                  ✓ Own Posts
                </span>
              ) : (
                <span className="role-badge">
                  ✕ Not Allowed
                </span>
              )}

            </span>

          </div>


          <div className="user-info-row">

            <span className="user-info-label">
              Delete Posts
            </span>

            <span>

              {canDelete ? (
                <span className="status-valid">
                  ✓ Allowed
                </span>
              ) : (
                <span className="role-badge">
                  ✕ Not Allowed
                </span>
              )}

            </span>

          </div>

        </section>


        {/* ===============================
            POSTS
        =============================== */}

        <section className="posts-section">

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >

            <h2 style={{ margin: 0 }}>
              Latest Posts
            </h2>


            {canCreate && (
              <button
                className="action-btn"
                onClick={handleAddClick}
              >
                + Add New Post
              </button>
            )}

          </div>


          {/* Message */}

          {message && (
            <div
              style={{
                padding: "12px",
                marginBottom: "15px",
                borderRadius: "8px",
                background: "#eff6ff",
                color: "#1d4ed8",
              }}
            >
              {message}
            </div>
          )}


          {/* ===============================
              ADD / EDIT FORM
          =============================== */}

          {showForm && (
            <form
              onSubmit={handleSubmit}
              style={{
                padding: "20px",
                marginBottom: "25px",
                borderRadius: "12px",
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
              }}
            >

              <h3>
                {editingPost
                  ? "Edit Post"
                  : "Create New Post"}
              </h3>


              <input
                type="text"
                name="title"
                placeholder="Post Title"
                value={formData.title}
                onChange={handleChange}
                required
                style={inputStyle}
              />


              <input
                type="text"
                name="category"
                placeholder="Category"
                value={formData.category}
                onChange={handleChange}
                required
                style={inputStyle}
              />


              <textarea
                name="content"
                placeholder="Post Content"
                value={formData.content}
                onChange={handleChange}
                required
                rows="5"
                style={{
                  ...inputStyle,
                  paddingTop: "12px",
                  resize: "vertical",
                }}
              />


              <button
                type="submit"
                className="action-btn"
                style={{
                  marginRight: "10px",
                }}
              >
                {editingPost
                  ? "Update Post"
                  : "Create Post"}
              </button>


              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingPost(null);
                }}
                style={cancelButtonStyle}
              >
                Cancel
              </button>

            </form>
          )}


          {/* ===============================
              POSTS TABLE
          =============================== */}

          <table className="posts-table">

            <thead>

              <tr>

                <th>
                  ID
                </th>

                <th>
                  Title
                </th>

                <th>
                  Author
                </th>

                <th>
                  Category
                </th>

                <th>
                  Date
                </th>

                <th>
                  Actions
                </th>

              </tr>

            </thead>


            <tbody>

              {posts.map((post) => (

                <tr key={post.id}>

                  <td>
                    {post.id}
                  </td>

                  <td>
                    <strong>
                      {post.title}
                    </strong>
                  </td>

                  <td>
                    {post.author}
                  </td>

                  <td>
                    <span className="role-badge">
                      {post.category}
                    </span>
                  </td>

                  <td>
                    {post.date}
                  </td>


                  <td>

                    {canEdit(post) && (
                      <button
                        onClick={() =>
                          handleEditClick(post)
                        }
                        style={editButtonStyle}
                      >
                        ✏️ Edit
                      </button>
                    )}


                    {canDelete && (
                      <button
                        onClick={() =>
                          handleDelete(post.id)
                        }
                        style={deleteButtonStyle}
                      >
                        🗑 Delete
                      </button>
                    )}


                    {!canEdit(post) &&
                      !canDelete && (
                        <span
                          style={{
                            color: "#94a3b8",
                            fontSize: "13px",
                          }}
                        >
                          👁 View Only
                        </span>
                      )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </section>

      </main>
    </>
  );
}


// ========================================
// INLINE FORM STYLES
// ========================================

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  fontSize: "14px",
  boxSizing: "border-box",
};


const cancelButtonStyle = {
  padding: "11px 18px",
  border: "none",
  borderRadius: "9px",
  background: "#64748b",
  color: "white",
  cursor: "pointer",
};


const editButtonStyle = {
  padding: "7px 10px",
  marginRight: "6px",
  border: "none",
  borderRadius: "7px",
  background: "#2563eb",
  color: "white",
  cursor: "pointer",
};


const deleteButtonStyle = {
  padding: "7px 10px",
  border: "none",
  borderRadius: "7px",
  background: "#ef4444",
  color: "white",
  cursor: "pointer",
};


export default Dashboard;