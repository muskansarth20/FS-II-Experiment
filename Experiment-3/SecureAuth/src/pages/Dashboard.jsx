import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h1>Dashboard</h1>

      <br />

      <Link to="/admin">
        <button>Admin Page</button>
      </Link>

      <br />
      <br />

      <Link to="/editor">
        <button>Editor Page</button>
      </Link>

      <br />
      <br />

      <Link to="/viewer">
        <button>Viewer Page</button>
      </Link>

      <br />
      <br />

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Dashboard;