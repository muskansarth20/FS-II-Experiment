import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">

      <Link to="/dashboard" className="navbar-brand">
        🔐 SecureAuth
      </Link>

      <div className="navbar-links">
        <Link to="/dashboard">
          Dashboard
        </Link>

        {user?.role === "Admin" && (
          <Link to="/admin">
            Admin
          </Link>
        )}

        {user?.role === "Editor" && (
          <Link to="/editor">
            Editor
          </Link>
        )}

        {user?.role === "Viewer" && (
          <Link to="/viewer">
            Viewer
          </Link>
        )}
      </div>

      <div className="navbar-user">
        <span>
          👤 {user?.username}
        </span>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>
      </div>

    </nav>
  );
}

export default Navbar;