import React, { useState } from "react";
import { Circle } from "rc-progress";
import styles from "./Dashboard.module.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import CryptoJS from "crypto-js";

function Dashboard() {
  const [currentPage, setCurrentPage] = useState("Thought");
  const [selectedMood, setSelectedMood] = useState("");
  const [textInput, setTextInput] = useState("");

  const handleMoodClick = (mood) => {
    setSelectedMood(mood);
  };

  const handleSubmit = async (e) => {
    if (!selectedMood) {
      alert("PLease select a mood before submitting.");
      return;
    }

    if (!textInput.trim()) {
      alert("Please enter a thought before submitting.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/saveMoodAndText", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mood: selectedMood,
          text: textInput,
        }),
      });

      if (response.ok) {
        alert("Mood and thought saved successfully!");
        setSelectedMood("");
      } else {
        alert("Failed to save mood and thought. Please try again.");
      }
    } catch (error) {
      console.error("Error saving mood and thought:", error);
      alert("Failed to save mood and thought.");
    }
  };

  const renderContent = () => {
    if (currentPage === "Thought") {
      return (
        <div className={styles.content}>
          <div className={styles.share}>
            <div className={styles.options}>
              <button
                className={styles.optionbtn}
                onClick={() => handleMoodClick("Happy")}
              >
                {" "}
                😊 Happy
              </button>
              <button
                className={styles.optionbtn}
                onClick={() => handleMoodClick("Sad")}
              >
                {" "}
                😔 Sad
              </button>
              <button
                className={styles.optionbtn}
                onClick={() => handleMoodClick("Confused")}
              >
                {" "}
                🤔 Confused
              </button>
              <button
                className={styles.optionbtn}
                onClick={() => handleMoodClick("Angry")}
              >
                {" "}
                😡 Angry
              </button>
            </div>
            <input
              className={styles.textspace}
              placeholder="type here"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
            />
            <button className={styles.submitbtn} onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      );
    } else if (currentPage === "Home") {
      return (
        <div className={styles.stats}>
          <div className={styles.analysis}>
            <div className={styles.info}>
              <h2>User Name</h2>
              <h2>Email</h2>
              <h2>Age</h2>
            </div>
            <div className={styles.track}>
              <div className={styles.total}>
                <div className={styles.totalprog}>
                  <Circle
                    percent={100}
                    strokeWidth={6}
                    strokeColor={"greenyellow"}
                    strokeLinecap="square"
                    trailWidth={6}
                    trailColor="black"
                  />
                </div>
              </div>
              <div className={styles.allprog}>
                <div className={styles.prog}>
                  <div className={styles.cbar}>
                    <Circle
                      percent={40}
                      strokeWidth={6}
                      strokeColor={"greenyellow"}
                      strokeLinecap="square"
                      trailWidth={6}
                      trailColor="black"
                    />
                  </div>
                  <div className={styles.cbar}>
                    <Circle
                      percent={10}
                      strokeWidth={6}
                      strokeColor={"yellow"}
                      strokeLinecap="square"
                      trailWidth={6}
                      trailColor="black"
                    />
                  </div>
                </div>
                <div className={styles.prog}>
                  <div className={styles.cbar}>
                    <Circle
                      percent={30}
                      strokeWidth={6}
                      strokeColor={"red"}
                      strokeLinecap="square"
                      trailWidth={6}
                      trailColor="black"
                    />
                  </div>
                  <div className={styles.cbar}>
                    <Circle
                      percent={20}
                      strokeWidth={6}
                      strokeColor={"gray"}
                      strokeLinecap="square"
                      trailWidth={6}
                      trailColor="black"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.previousip}>
            <div className={styles.history}>
              <h3>Recent Logins</h3>
              <h4>Login 1</h4>
              <h4>Login 2</h4>
              <h4>Login 3</h4>
            </div>
            <div className={styles.history}>
              <h3>Recent Moods</h3>
              <h4>Mood 1</h4>
              <h4>Mood 2</h4>
              <h4>Mood 3</h4>
            </div>
            <div className={styles.history}>
              <h3>
                It's okay to feel what you're feeling right now—your emotions
                are valid, and they matter.
              </h3>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.navbar}>
        <div className={styles.profile}>
          <AccountCircleIcon
            style={{ width: "6rem", height: "6rem", color: "white" }}
          />
        </div>
        <h1>User Name</h1>
        <button
          className={styles.navbtn}
          onClick={() => setCurrentPage("Home")}
        >
          My Dashboard
        </button>
        <button
          className={styles.navbtn}
          onClick={() => setCurrentPage("Thought")}
        >
          Share a Thought
        </button>
        <Link to="/">
          <button className={styles.navbtn}>Signout</button>
        </Link>
      </div>
      <div>{renderContent()}</div>
    </div>
  );
}

export default Dashboard;
