import React from "react";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/Login");
  };
  return (
    <body className={styles.body}>
      <div className={styles.navbar}>
        <h3 className={styles.navtitle}>Aura Log</h3>
        <button className={styles.navbtn}>Home</button>
        <button className={styles.navbtn} onClick={handleRedirect}>
          Login
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
          <h3>Why Aura Log?</h3>
          <div className={styles.mainsplit}>
            <div className={styles.split}>
              <h3>Anonymous Sharing: Share anything, privately.</h3>
              <h3>Mood Tracking: Chart your emotional patterns.</h3>
            </div>
            <div className={styles.split}>
              <h3>Personal Space: No opinions, just your expression.</h3>
              <h3>Aura Log: Your private space for self-reflection.</h3>
            </div>
          </div>

          <button className={styles.startbtn}>Get Started</button>
        </div>
      </center>
    </body>
  );
}

export default Home;
