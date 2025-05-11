import { useState, useEffect } from "react";
import { FaSun, FaMoon, FaCog } from "react-icons/fa";
import WeekCalendar from "./components/WeekCalendar";
import Todo from "./components/Todo";
import type { TodoItem } from "./components/Todo";
import Classes from "./components/ClassDetails";
import GradeCalculator from "./components/GradeCalculator";
import appLogo from "/src/assets/logo.svg";
import Settings from "./components/Settings";
import Login from "./components/Login";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState<
    "todo" | "classes" | "grades" | "settings"
  >("todo");
  const [darkMode, setDarkMode] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [tasks, setTasks] = useState<TodoItem[]>([]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleLoadSession = (id: string) => {
    console.log("Load session:", id);
    setShowLogin(false);
  };

  const handleSaveSession = (id: string) => {
    console.log("Save session:", id);
    setShowLogin(false);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "todo":
        return <Todo items={tasks} setItems={setTasks} />;
      case "classes":
        return <Classes />;
      case "grades":
        return <GradeCalculator />;
      case "settings":
        return <Settings />;
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
          <button
            className={activeTab === "settings" ? "active" : ""}
            onClick={() => setActiveTab("settings")}
          >
            <FaCog />
          </button>
          <button onClick={() => setShowLogin(true)}>Login</button>
        </div>
      </header>
      <div className="app-container">
        <WeekCalendar items={tasks} />
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
      {showLogin && (
        <Login onLoad={handleLoadSession} onSave={handleSaveSession} />
      )}
    </>
  );
}

export default App;
