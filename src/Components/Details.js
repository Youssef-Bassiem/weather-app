import React from "react";

const Details = ({ text, value, unit }) => {
  return (
    <div className="data-details">
      <img src={`Assets/${text}.png`} alt={text} />
      <p>
        <span className="value">{value + " " + unit}</span>
        <span>{text}</span>
      </p>
    </div>
  );
};

export default Details;
