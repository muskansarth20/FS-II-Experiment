import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { usePosts } from "../context/PostsContext";

function Viewer() {
  const { user } = useAuth();
  const { posts } = usePosts();

  return (
    <>
      <Navbar />

      <div className="viewer-container">

        <h1>Viewer Dashboard</h1>

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
            <h2>Read Only</h2>
            <p>Permission</p>
          </div>

        </div>

        <h2>Available Posts</h2>

        <div className="posts-grid">

          {posts.map((post) => (

            <div className="post-card" key={post.id}>

              <span className="category">
                {post.category}
              </span>

              <h3>{post.title}</h3>

              <p>{post.content}</p>

              <div className="post-footer">

                <span>
                  👤 {post.author}
                </span>

                <span>
                  📅 {post.date}
                </span>

              </div>

              <button
                className="view-btn"
                disabled
              >
                Read Only
              </button>

            </div>

          ))}

        </div>

      </div>
    </>
  );
}

export default Viewer;