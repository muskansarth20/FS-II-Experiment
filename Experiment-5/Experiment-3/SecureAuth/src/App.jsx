import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Editor from "./pages/Editor";
import Viewer from "./pages/Viewer";
import Unauthorized from "./pages/Unauthorized";

import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

function App() {
  const { user } = useAuth();

  return (
    <Routes>

      {/* Login Page */}
      <Route
        path="/"
        element={
          user ? <Navigate to="/dashboard" /> : <Login />
        }
      />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Admin */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <Admin />
          </ProtectedRoute>
        }
      />

      {/* Editor */}
      <Route
        path="/editor"
        element={
          <ProtectedRoute allowedRoles={["Editor"]}>
            <Editor />
          </ProtectedRoute>
        }
      />

      {/* Viewer */}
      <Route
        path="/viewer"
        element={
          <ProtectedRoute allowedRoles={["Viewer"]}>
            <Viewer />
          </ProtectedRoute>
        }
      />

      {/* Unauthorized */}
      <Route
        path="/unauthorized"
        element={<Unauthorized />}
      />

      {/* Wrong URL */}
      <Route
        path="*"
        element={<Navigate to="/" />}
      />

    </Routes>
  );
}

export default App;