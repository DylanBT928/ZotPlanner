import { useState, useEffect } from "react";
import { FaSun, FaMoon, FaCog } from "react-icons/fa";
import WeekCalendar from "./components/WeekCalendar";
import Todo from "./components/Todo";
import Classes from "./components/ClassDetails";
import GradeCalculator from "./components/GradeCalculator";
import appLogo from "/src/assets/logo.svg";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState<"todo" | "classes" | "grades">(
    "todo"
  );
  const [darkMode, setDarkMode] = useState(true);

  // toggle dark / light mode
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "todo":
        return <Todo />;
      case "classes":
        return <Classes />;
      case "grades":
        return <GradeCalculator />;
    }
  };

  return (
    <>
      <header className="top-bar">
        <div className="brand">
          <img src={appLogo} alt="logo" className="brand-logo" />
          <span className="brand-title">ZotPlanner</span>
        </div>
        <div className="top-buttons">
          <button onClick={() => setDarkMode((d) => !d)}>
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
          <button>
            <FaCog />
          </button>
        </div>
      </header>
      <div className="app-container">
        <WeekCalendar />
        <div className="main-content">
          <nav className="tabs">
            <button
              className={activeTab === "todo" ? "active" : ""}
              onClick={() => setActiveTab("todo")}
            >
              To-Do
            </button>
            <button
              className={activeTab === "classes" ? "active" : ""}
              onClick={() => setActiveTab("classes")}
            >
              Class Details
            </button>
            <button
              className={activeTab === "grades" ? "active" : ""}
              onClick={() => setActiveTab("grades")}
            >
              Grade Calculator
            </button>
          </nav>
          {renderTabContent()}
        </div>
      </div>
    </>
  );
}

export default App;
