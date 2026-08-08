import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login, user } = useAuth();
  const navigate = useNavigate();

  // ========================================
  // REDIRECT USER ACCORDING TO ROLE
  // ========================================

  useEffect(() => {
    if (user) {
      if (user.role === "Admin") {
        navigate("/admin", { replace: true });
      } else if (user.role === "Editor") {
        navigate("/editor", { replace: true });
      } else if (user.role === "Viewer") {
        navigate("/viewer", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    }
  }, [user, navigate]);

  // ========================================
  // HANDLE LOGIN
  // ========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setIsLoading(true);

    const result = await login(
      username,
      password
    );

    if (!result.success) {
      setError(result.message);
    }

    setIsLoading(false);
  };

  return (
    <div className="login-page">

      <div className="login-card">

        {/* ========================================
            HEADER
        ======================================== */}

        <h1>🔐 SecureAuth</h1>

        <h3>
          JWT Authentication System
        </h3>


        {/* ========================================
            LOGIN FORM
        ======================================== */}

        <form onSubmit={handleSubmit}>

          {/* Username */}

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            required
            disabled={isLoading}
          />


          {/* Password */}

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
            disabled={isLoading}
          />


          {/* ========================================
              SHOW PASSWORD
          ======================================== */}

          <div className="show-password">

            <input
              type="checkbox"
              checked={showPassword}
              onChange={() =>
                setShowPassword(
                  !showPassword
                )
              }
              disabled={isLoading}
            />

            <span>
              Show Password
            </span>

          </div>


          {/* ========================================
              ERROR MESSAGE
          ======================================== */}

          {error && (
            <p className="error">
              {error}
            </p>
          )}


          {/* ========================================
              LOGIN BUTTON
          ======================================== */}

          <button
            type="submit"
            disabled={isLoading}
          >
            {isLoading
              ? "Logging in..."
              : "Login"}
          </button>

        </form>


        {/* ========================================
            DEMO ACCOUNTS
        ======================================== */}

        <div className="demo-users">

          <h4>
            Demo Accounts
          </h4>

          <p>
            <strong>Admin:</strong>{" "}
            admin / admin123
          </p>

          <p>
            <strong>Editor:</strong>{" "}
            editor / editor123
          </p>

          <p>
            <strong>Viewer:</strong>{" "}
            viewer / viewer123
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;