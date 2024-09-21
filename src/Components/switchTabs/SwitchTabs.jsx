import React, { useState } from "react";
import "./style.scss";

const SwitchTabs = ({ data, onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [activePosition, setActivePosition] = useState(0);

  const activeTab = (tab, index) => {
    setActivePosition(index * 220); 
    setTimeout(() => {
      setSelectedTab(index); 
    }, 300);
    onTabChange(tab, index);
  };

  return (
    <div className="switchingTabs rounded-lg p-1">
      <div className="tabItems gap-5 flex items-center relative ">
        {data.map((tab, index) => (
          <span
            key={index}
            className={`tabItem py-1 text-center rounded-md my-1 cursor-pointer ${
              selectedTab === index ? "active" : ""
            }`}
            onClick={() => activeTab(tab, index)}
          >
            {tab}
          </span>
        ))}
        <span className="movingBg" style={{ left: `${activePosition}px` }} />
      </div>
    </div>
  );
};

export default SwitchTabs;
