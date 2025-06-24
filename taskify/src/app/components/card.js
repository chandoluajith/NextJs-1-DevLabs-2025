import React from "react";
import "./card.css";

const Card = ({ title, description, priority }) => {
  return (
    <div className="task-card">
      <button className="task-options">⋮</button>

      <div className="task-header">
        <h3 className="task-title">Research competitors</h3>
        <span className="task-priority priority-red">P1</span>
      </div>

      <p className="task-desc">Analyze the top 5 competitors in the market</p>

      <div className="task-footer">
        <span className="task-arrow">→</span>
      </div>
    </div>
  );
};

export default Card;