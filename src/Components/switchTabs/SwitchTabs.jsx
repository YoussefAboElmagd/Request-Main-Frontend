import React, { useState } from "react";
import "./style.scss";
import { useLanguage } from "../../context/LanguageContext";

const SwitchTabs = ({ data, onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [activePosition, setActivePosition] = useState(0);
  const { isRTL } = useLanguage();

  const activeTab = (tab, index) => {
    setActivePosition(index * 220); 
    setTimeout(() => {
      setSelectedTab(index); 
    }, 300);
    onTabChange(tab, index);
  };

  return (
    <div className="switchingTabs  p-1">
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
        <span className="movingBg" style={{ ...(isRTL ? { right: `${activePosition}px` } : { left: `${activePosition}px` }), }} />
      </div>
    </div>
  );
};

export default SwitchTabs;
