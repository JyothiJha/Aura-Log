import React, { useState } from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";


function Home() {
    const [currentPage, setCurrentPage] = useState("Home");
  
    const renderContent = () => {
      if (currentPage === "Home") {
        return (
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
        );
      } else if (currentPage === "Contact") {
        return (
          <div className= {styles.contact}>
          <p><h1 className= {styles.contacttitle}>Contact Us</h1>
          <h3 className= {styles.quiry}>Need to get in touch with us? Fill out the form with your inquiry.</h3></p>
          <form className= {styles.contactform}>
            <h4>Name</h4>
            <input type="text" />
            <h4>Email</h4>
            <input type="text" />
            <h4>What can we help you with?</h4>
            <input type="text" />
            <button className={styles.submitbtn}>Submit</button>
          </form>
        </div>
              
        );
      }
    };
  
    return (
      <div className={styles.body}>
      <div className={styles.navbar}>
        <h3 className={styles.navtitle}>Aura Log</h3>
        <button className={styles.navbtn} onClick={() => setCurrentPage("Home")}>
          Home
        </button>
        <button className={styles.navbtn}>
          <Link to="/login"> Login</Link>
        </button>
        <button className={styles.navbtn}  onClick={() => setCurrentPage("Contact")}>Contact</button>
      </div>
        <div>{renderContent()}</div>
      </div>
      
    );
  }

export default Home

