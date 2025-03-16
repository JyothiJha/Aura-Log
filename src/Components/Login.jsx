import React, { useState } from "react";
import styles from "./Login.module.css";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";

function MovingDiv() {
  const [movingRight, setMovingRight] = useState(true);
  const [expanded, setExpanded] = useState(false);

  const togglePosition = () => {
    if (!expanded) {
      setExpanded(true);
      setTimeout(() => {
        setExpanded(false);
        setMovingRight(!movingRight);
      }, 500);
    }
  };
  return (
    <div className={styles.main}>
      <div className={styles.login}>
        <form>
          <h1>Login</h1>
          <h4>Enter Email</h4>
          <input type="text" placeholder="abc@gmail.com" />
          <h4>Enter Password</h4>
          <input type="text" placeholder="must contain 8 characters" />
          <br />
          <a href="">Forgot Password?</a>
          <br />
          <Link to="/dashboard"> <button className={styles.logbtn}>Login</button> </Link>
         
        </form>
      </div>
      <div className={styles.signup}>
        <form>
          <h1>Signup</h1>
          <h4>Enter Name</h4>
          <input type="text" placeholder="Full name" />
          <h4>Enter Email</h4>
          <input type="text" placeholder="abc@gmail.com" />
          <h4>Enter Password</h4>
          <input type="text" placeholder="must contain 8 characters" />
          <br />
          <a href="">Forgot Password?</a>
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
        /></Link>
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
