import React, { useState } from "react";
import "./Login.css";

interface LoginProps {
  onLoad: (id: string) => void;
  onSave: (id: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLoad, onSave }) => {
  const [id, setId] = useState("");

  const handleLoad = () => {
    if (id.trim()) onLoad(id.trim());
  };

  const handleSave = () => {
    if (id.trim()) onSave(id.trim());
  };

  return (
    <div className="login-overlay">
      <div className="login-panel">
        <h2 className="login-title">Load or Save Session</h2>
        <input
          type="text"
          className="login-input"
          placeholder="Enter session ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleLoad();
            }
          }}
        />
        <div className="login-buttons">
          <button
            className="btn load"
            disabled={!id.trim()}
            onClick={handleLoad}
          >
            Load
          </button>
          <button
            className="btn save"
            disabled={!id.trim()}
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
