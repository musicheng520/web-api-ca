import { useContext, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

const LoginPage = () => {
  const context = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const location = useLocation();
  const { from } = location.state ? { from: location.state.from.pathname } : { from: "/" };

  const doLogin = async () => {
    setError("");
    try {
      await context.authenticate(userName, password);
    } catch (err) {
      setError(err.message);
    }
  };

  if (context.isAuthenticated) return <Navigate to={from} replace />;

  return (
    <div style={{ maxWidth: 420, margin: "40px auto" }}>
      <h2>Login</h2>
      {error && <p style={{ color: "crimson" }}>{error}</p>}
      <input placeholder="username" onChange={(e) => setUserName(e.target.value)} />
      <br />
      <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button onClick={doLogin}>Log in</button>
    </div>
  );
};

export default LoginPage;
