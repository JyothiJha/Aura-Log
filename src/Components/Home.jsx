import React from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <body className={styles.body}>
      <div className={styles.navbar}>
        <h3 className={styles.navtitle}>Aura Log</h3>
        <button className={styles.navbtn}>
          <Link to="/"> Home</Link>
        </button>
        <button className={styles.navbtn}>
          <Link to="/login"> Login</Link>
        </button>
        <button className={styles.navbtn}>Contact</button>
      </div>
      <center>
        <div className={styles.content}>
          <h1 className={styles.welcome}>Welcome to Aura Log</h1>
          <h2>
            Welcome to a space where your daily mood takes center stage. Start
            your day by capturing your vibe, and throughout, freely share
            moments, thoughts, or anything that resonates with you. This is your
            personal canvas, a place for expression without the pressure of
            opinions.
          </h2>
          <Link to="/login"> <button className={styles.startbtn}>Get Started</button></Link>
        </div>
      </center>
    </body>
  );
}

export default Home;
