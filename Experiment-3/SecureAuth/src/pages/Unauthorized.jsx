import { Link } from "react-router-dom";

function Unauthorized() {
  return (
    <div className="unauthorized-container">

      <div className="unauthorized-card">

        <h1>403</h1>

        <h2>Access Denied</h2>

        <p>
          Sorry! You don't have permission to access this page.
        </p>

        <Link to="/dashboard">
          <button>Go Back to Dashboard</button>
        </Link>

      </div>

    </div>
  );
}

export default Unauthorized;