import React, { useState } from "react";
import PropTypes from "prop-types";
import "./style.scss"
const StatusHeader = ({ buttons }) => {
  const [selectedIndex, setSelectedIndex] = useState(0); 
  const [indicatorLeft, setIndicatorLeft] = useState(0); 

  const handleButtonClick = (index) => {
    setIndicatorLeft(index * 60); 
    setSelectedIndex(index);
    // setTimeout(() => {
    //   setSelectedIndex(index); 

    // }, 300);
  };

  return (
    <div className="StatusHeader my-2">
      <div className="flex">
        <div className="BtnGroup">
          {buttons.map((button, index) => (
            <button
              key={button.value}
              className={`btn px-4 py-5 font-inter font-bold text-xs text-gray w-16  ${
                selectedIndex === index ? `active_${button.value} ` : ""
              }`}
              onClick={() => handleButtonClick(index)}
            >
              {button.label}
            </button>
          ))}
        </div>
        <div className="filterBtn"></div>
      </div>
      <div className="bar">
        <span
          className="active-indicator"
          style={{ left: `${indicatorLeft}px` }}
        ></span>
      </div>
    </div>
  );
};

// PropTypes for validation
StatusHeader.propTypes = {
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default StatusHeader;
