import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

const SignupPage = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  const signup = async () => {
    setError("");
    setOk("");
    try {
      const success = await context.register(userName, password);
      if (success) {
        setOk("Signup successful. You can now log in.");
        setTimeout(() => navigate("/login"), 800);
      } else {
        setError("Signup failed.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "40px auto" }}>
      <h2>Sign Up</h2>

      {error && <p style={{ color: "crimson" }}>{error}</p>}
      {ok && <p style={{ color: "green" }}>{ok}</p>}

      <input
        id="username"
        placeholder="user name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <br />
      <input
        id="password"
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />

      <button onClick={signup}>Create account</button>

      <p style={{ marginTop: 12 }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default SignupPage;
