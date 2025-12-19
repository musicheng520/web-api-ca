import { useState, createContext } from "react";
import { login, signup } from "../api/auth-api";

export const AuthContext = createContext(null); // eslint-disable-line

const AuthContextProvider = (props) => {
  // Load from localStorage if present
  const existingToken = localStorage.getItem("token");
  const existingUser = localStorage.getItem("user");

  const [authToken, setAuthToken] = useState(existingToken);
  const [isAuthenticated, setIsAuthenticated] = useState(!!existingToken);
  const [user, setUser] = useState(existingUser ? JSON.parse(existingUser) : null);

  // Save token
  const setToken = (token) => {
    localStorage.setItem("token", token);
    setAuthToken(token);
    setIsAuthenticated(true);
  };

  // Login
  const authenticate = async (username, password) => {
    const result = await login(username, password);
    if (result.token) {
      setToken(result.token);
      const u = {
        username: result.username || username,
        userId: result.userId,
      };
      localStorage.setItem("user", JSON.stringify(u));
      setUser(u);
    }
  };

  // Signup
  const register = async (username, password) => {
    const result = await signup(username, password);
    return result.success === true;
  };

  // Logout
  const signout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authToken,
        user,
        authenticate,
        register,
        signout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
