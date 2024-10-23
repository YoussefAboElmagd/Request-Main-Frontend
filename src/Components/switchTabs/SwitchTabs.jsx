import React, { useEffect, useState } from "react";
import "./style.scss";
import { useLanguage } from "../../context/LanguageContext";

const SwitchTabs = ({
  data,
  onTabChange,
  movingBg_style,
  main_style,
  activeTab_style,
  tab_style,
  Tab,
}) => {
  const [selectedTab, setSelectedTab] = useState(Tab);
  const [activePosition, setActivePosition] = useState(0);
  const { isRTL } = useLanguage();

   useEffect(() => {
    setSelectedTab(Tab); 
     setActivePosition(Tab * 220);
   }, [Tab]);

  const activeTab = (tab, index) => {
    setActivePosition(index * 220);
    setTimeout(() => {
      setSelectedTab(index);
    }, 300);
    onTabChange(tab, index);
  };

  return (
    <div className={`switchingTabs  ${main_style} p-1`}>
      <div className="tabItems gap-5 flex items-center relative ">
        {data.map((tab, index) => (
          <span
            key={index}
            className={`tabItem ${tab_style} py-1 text-center rounded-md my-1 cursor-pointer ${
              selectedTab === index ? `activeTabItem ${activeTab_style}` : ""
            } `}
            onClick={() => activeTab(tab, index)}
          >
            {tab}
          </span>
        ))}
        <span
          className={`movingBg ${movingBg_style}`}

          style={{
            ...(isRTL
              ? { right: `${activePosition}px` }
              : { left: `${activePosition}px` }),
          }}
        />
      </div>
    </div>
  );
};

export default SwitchTabs;
