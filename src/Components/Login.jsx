import React, { useState } from "react";
import styles from "./Login.module.css";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function MovingDiv() {
  const [movingRight, setMovingRight] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const togglePosition = () => {
    if (!expanded) {
      setExpanded(true);
      setTimeout(() => {
        setExpanded(false);
        setMovingRight(!movingRight);
      }, 500);
    }
  };
  // Function to validate email format
  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(signupData.email)) {
      alert("please enter a valid email address");
      return;
    }
    if (signupData.password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message || "Signup successful!");
      } else {
        const error = await response.json();
        alert(error.message || "Signup failed.");
      }
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Signup failed. Please try again.");
    }
  };

  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message || "Login successful!");

        // Redirect to the dashboard after the alert
        navigate("/dashboard");
      } else {
        const error = await response.json();

        // Show error alert for invalid credentials or other issues
        alert(error.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please try again later.");
    }
  };

  const handleInputChange = (event, type) => {
    const { name, value } = event.target;
    if (type === "login") {
      setLoginData({ ...loginData, [name]: value });
    } else if (type === "signup") {
      setSignupData({ ...signupData, [name]: value });
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.login}>
        <form onSubmit={handleLoginSubmit}>
          <h1>Login</h1>
          <h4>Enter Email</h4>
          <input
            type="text"
            name="email"
            placeholder="abc@gmail.com"
            value={loginData.email}
            onChange={(e) => handleInputChange(e, "login")}
          />
          <h4>Enter Password</h4>
          <input
            type="password"
            name="password"
            placeholder="must contain 8 characters"
            value={loginData.password}
            onChange={(e) => handleInputChange(e, "login")}
          />
          <br />
          <a href="#" onClick={(e) => e.preventDefault()}>
            Forgot Password?
          </a>
          <br />
          <button
            className={styles.logbtn}
            type="submit"
            onClick={handleLoginSubmit}
          >
            Login
          </button>
        </form>
      </div>
      <div className={styles.signup}>
        <form onSubmit={handleSignupSubmit}>
          <h1>Signup</h1>
          <h4>Enter Name</h4>
          <input
            type="text"
            name="name"
            placeholder="Full name"
            value={signupData.name}
            onChange={(e) => handleInputChange(e, "signup")}
          />
          <h4>Enter Email</h4>
          <input
            type="text"
            name="email"
            placeholder="abc@gmail.com"
            value={signupData.email}
            onChange={(e) => handleInputChange(e, "signup")}
          />
          <h4>Enter Password</h4>
          <input
            type="password"
            name="password"
            placeholder="must contain 8 characters"
            value={signupData.password}
            onChange={(e) => handleInputChange(e, "signup")}
          />
          <br />
          <br />
          <button className={styles.logbtn}>Signup</button>
        </form>
      </div>
      <div
        className={styles.slider}
        id="movingDiv"
        style={{
          left: movingRight ? "50%" : "0%",
        }}
      >
        <Link to="/">
          <HomeIcon
            style={{
              color: "black",
              width: "3rem",
              height: "3rem",
              margin: "1rem",
            }}
          />
        </Link>
        <center>
          <h1 className={styles.slidertitle}>Hello, Welcome!</h1>
          <h1>{movingRight ? "Login" : "Signup"} now </h1>
          <h2>to Explore a new World!</h2>
          <p>
            {movingRight
              ? "Are you a new user?"
              : "Do you have an existing account?"}
          </p>
          <button className={styles.swapbtn} onClick={togglePosition}>
            {movingRight ? "Signup" : "Login"}
          </button>
        </center>
      </div>
    </div>
  );
}

export default MovingDiv;
