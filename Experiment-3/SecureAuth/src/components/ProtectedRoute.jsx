import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();

  // User is not logged in
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Role-based authorization
  if (
    allowedRoles &&
    !allowedRoles.includes(user.role)
  ) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Access granted
  return children;
}

export default ProtectedRoute;