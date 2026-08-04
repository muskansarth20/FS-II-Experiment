import { Link } from "react-router-dom";

function Unauthorized() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Access Denied</h1>

      <p>You are not authorized to access this page.</p>

      <Link to="/dashboard">
        <button>Back to Dashboard</button>
      </Link>
    </div>
  );
}

export default Unauthorized;