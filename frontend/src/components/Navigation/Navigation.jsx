import React from 'react';
import ConnectedAccount from "./ConnectedAccount";
import ConnectedNetwork from "./ConnectedNetwork";
import "./Navigation.css";
import ClaimReward from "../Claim/ClaimReward";

const Navigation = ({ isDarkMode, toggleTheme }) => {
  return (
    <header className={`navbar ${isDarkMode ? "dark" : "light"}`}>
      <div className="navbar-btns">
        <ClaimReward />
      </div>
      <button onClick={toggleTheme} className="theme-toggle-btn">
        {isDarkMode ? (
          <span>🌞 Light Mode</span>
        ) : (
          <span>🌜 Dark Mode</span>
        )}
      </button>
      <div className="navbar-acc">
        <ConnectedAccount />
        <ConnectedNetwork />
      </div>
    </header>
  );
};

export default Navigation;
