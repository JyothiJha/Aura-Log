import React, { useState, useEffect } from "react";
import { Circle } from "rc-progress";
import styles from "./Dashboard.module.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import CryptoJS from "crypto-js";

function Dashboard() {
  const [currentPage, setCurrentPage] = useState("Thought");
  const [selectedMood, setSelectedMood] = useState("");
  const [activeButton, setActiveButton] = useState("");
  const [textInput, setTextInput] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const [moodStats, setMoodStats] = useState({
    total: 0,
    Happy: 0,
    Sad: 0,
    Confused: 0,
    Angry: 0,
  });

  useEffect(() => {
    // Fetch moods for the current session user
    async function fetchMoodStats() {
      try {
        const response = await fetch("http://localhost:3000/getSharedDataForUser", {
          credentials: "include",
        });
        if (!response.ok) return;

        const data = await response.json();
        // Count moods
        const stats = { total: 0, Happy: 0, Sad: 0, Confused: 0, Angry: 0 };
        data.forEach((entry) => {
          stats.total += 1;
          if (stats[entry.mood] !== undefined) stats[entry.mood] += 1;
        });
        setMoodStats(stats);
      } catch (err) {
        console.error("Failed to fetch mood stats", err);
      }
    }
    fetchMoodStats();
  }, []);

  const handleMoodClick = (mood) => {
    setSelectedMood(mood);
    setActiveButton(mood);
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
        setTextInput("");
        setActiveButton("");
      } else {
        alert("Failed to save mood and thought. Please try again.");
      }
    } catch (error) {
      console.error("Error saving mood and thought:", error);
      alert("Failed to save mood and thought.");
    }
  };

  const handleFetchData = async () => {
    if (!selectedYear || !selectedMonth || !selectedDate) {
      alert("Please select a date before fetching data.");
      return;
    }
    const selectedFullDate = `${selectedYear}-${selectedMonth}-${selectedDate}`;

    try {
      const response = await fetch(
        `http://localhost:3000/getSharedData?date=${selectedFullDate}`
      );
      if (!response.ok) {
        alert("Failed to fetch data.");
      }
      const data = await response.json();

      const filteredData = data.filter(
        (entry) => entry.date === selectedFullDate
      );

      if (filteredData.length > 0) {
        alert(`Data for ${selectedFullDate}:\n${filteredData[0].text}`);
      } else {
        alert(`No data found for ${selectedFullDate}.`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch data.Please try again.");
    }
  };

  const renderContent = () => {
    if (currentPage === "Thought") {
      return (
        <div className={styles.content}>
          <div className={styles.share}>
            <div className={styles.options}>
              <button
                className={`${styles.optionbtn} ${
                  activeButton === "Happy" ? styles.active : ""
                }`}
                onClick={() => handleMoodClick("Happy")}
              >
                {" "}
                😊 Happy
              </button>
              <button
                className={`${styles.optionbtn} ${
                  activeButton === "Sad" ? styles.active : ""
                }`}
                onClick={() => handleMoodClick("Sad")}
              >
                {" "}
                😔 Sad
              </button>
              <button
                className={`${styles.optionbtn} ${
                  activeButton === "Confused" ? styles.active : ""
                }`}
                onClick={() => handleMoodClick("Confused")}
              >
                {" "}
                🤔 Confused
              </button>
              <button
                className={`${styles.optionbtn} ${
                  activeButton === "Angry" ? styles.active : ""
                }`}
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
            <div className={styles.dropdown}>
              <div className={styles.dropdownRow}>
                <h3>Select the year</h3>
                <select
                  value={selectedYear}
                  className="styles.dropbtn"
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  <option value="">Select Year</option>
                  {Array.from({ length: 20 }, (_, i) => {
                    const year = 2025 + i;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
                <h3>Select the Month</h3>
                <select
                  value={selectedMonth}
                  className="styles.dropbtn"
                  onChange={(e) => setSelectedMonth(e.target.value)}
                >
                  <option value="">Select Month</option>
                  <option value="01">January</option>
                  <option value="02">February</option>
                  <option value="03">March</option>
                  <option value="04">April</option>
                  <option value="05">May</option>
                  <option value="06">June</option>
                  <option value="07">July</option>
                  <option value="08">August</option>
                  <option value="09">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
                <h3>Select the date</h3>
                <select
                  value={selectedDate}
                  className="styles.dropbtn"
                  onChange={(e) => setSelectedDate(e.target.value)}
                >
                  <option value="">select Date</option>
                  {Array.from({ length: 31 }, (_, i) => {
                    return (
                      <option
                        key={i + 1}
                        value={String(i + 1).padStart(2, "0")}
                      >
                        {i + 1}
                      </option>
                    );
                  })}
                </select>
              </div>
              <button className={styles.fetchbtn} onClick={handleFetchData}>
                Fetch Data
              </button>
            </div>

            <div className={styles.track}>
              <div className={styles.total}>
                <div className={styles.totalprog} data-tag="Total Mood Entries">
                  <Circle
                    percent={moodStats.total > 0 ? 100 : 0}
                    strokeWidth={6}
                    strokeColor={"greenyellow"}
                    strokeLinecap="square"
                    trailWidth={6}
                    trailColor="black"
                  />
                  <h3>Total input: {moodStats.total}</h3>
                </div>
              </div>
              <div className={styles.allprog}>
                <div className={styles.prog}>
                  <div className={styles.cbar} data-tag="Happy">
                    <Circle
                      percent={moodStats.Happy > 0 ? (moodStats.Happy / moodStats.total) * 100 : 0}
                      strokeWidth={6}
                      strokeColor={"greenyellow"}
                      strokeLinecap="square"
                      trailWidth={6}
                      trailColor="black"
                    />
                    <p>Happy ({moodStats.Happy})</p>
                  </div>
                  <div className={styles.cbar} data-tag="Sad">
                    <Circle
                      percent={moodStats.Sad > 0 ? (moodStats.Sad / moodStats.total) * 100 : 0}
                      strokeWidth={6}
                      strokeColor={"yellow"}
                      strokeLinecap="square"
                      trailWidth={6}
                      trailColor="black"
                    />
                    <p>Sad ({moodStats.Sad})</p>
                  </div>
                </div>
                <div className={styles.prog}>
                  <div className={styles.cbar} data-tag="Confused">
                    <Circle
                      percent={moodStats.Confused > 0 ? (moodStats.Confused / moodStats.total) * 100 : 0}
                      strokeWidth={6}
                      strokeColor={"red"}
                      strokeLinecap="square"
                      trailWidth={6}
                      trailColor="black"
                    />
                    <p>Confused ({moodStats.Confused})</p>
                  </div>
                  <div className={styles.cbar} data-tag="Angry">
                    <Circle
                      percent={moodStats.Angry > 0 ? (moodStats.Angry / moodStats.total) * 100 : 0}
                      strokeWidth={6}
                      strokeColor={"gray"}
                      strokeLinecap="square"
                      trailWidth={6}
                      trailColor="black"
                    />
                    <p>Angry ({moodStats.Angry})</p>
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
