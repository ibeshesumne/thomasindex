import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./Auth/AuthContext";

const Home = () => {
  const { isLoggedIn } = useAuth(); // Use the isLoggedIn property

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Welcome to the Thomas Index</h1>
      {!isLoggedIn ? ( // Conditionally render buttons
        <div>
          <p>
            Please login or register to access the features. Use the navigation
            bar above to proceed.
          </p>
          <div style={{ margin: "20px 0" }}>
            <Link
              to="/login"
              style={{ margin: "0 10px", color: "#007BFF", textDecoration: "none" }}
            >
              Login
            </Link>
            <Link
              to="/register"
              style={{ margin: "0 10px", color: "#007BFF", textDecoration: "none" }}
            >
              Register
            </Link>
          </div>
        </div>
      ) : (
        <p>Welcome back! Use the navigation bar above to access features.</p>
      )}
    </div>
  );
};

export default Home;
