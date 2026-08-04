import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const users = [
    { username: "admin", password: "123", role: "admin" },
    { username: "editor", password: "123", role: "editor" },
    { username: "viewer", password: "123", role: "viewer" },
  ];

  const handleLogin = (e) => {
    e.preventDefault();

    const user = users.find(
      (u) =>
        u.username === username &&
        u.password === password
    );

    if (user) {
      // Fake JWT Token
      const token = btoa(
        JSON.stringify({
          username: user.username,
          role: user.role,
        })
      );

      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);

      navigate("/dashboard");
    } else {
      setError("Invalid Username or Password");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Login Page</h1>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <button type="submit">Login</button>

        <p style={{ color: "red" }}>{error}</p>
      </form>
    </div>
  );
}

export default Login;