import React, { useState } from "react";
import SwitchTabs from "../../Components/switchTabs/SwitchTabs";
import AddNewAccess from "./AddAccess/AddNewAccess";
import DelegatedAccess from "./DelegatedAccess/DelegatedAccess";
import { t } from "i18next";
import { BsMicrosoftTeams } from "react-icons/bs";

const Team = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const buttons = [
    {
      label: t("+Add new access"),
      value: "AddNewAccess",
      component: <AddNewAccess />,
    },
    {
      label: t("Delegated access"),
      value: "DelegatedAccess",
      component: <DelegatedAccess />,
    },
  ];

  const handleTabChange = (tab, index) => {
    setSelectedTab(index);
  };
  return (
    <div className="Team ">
      <div className="header bg-white  rounded-3xl p-2">
        <div className="head  flex items-center  justify-between p-2">
          <h5 className="font-semibold  text-base">Team</h5>
          <div className="TotalMembers flex items-center  gap-2">
            <span
              className="w-7 h-7 md:w-9 md:h-9  flex items-center  justify-center rounded-full"
              style={{
                background: "#CCABDA",
              }}
            >
              <BsMicrosoftTeams className="text-purple-dark" />
            </span>
            <p
              className="font-medium md:font-semibold  text-base md:text-lg "
              style={{
                color: "#696A6B",
              }}
            >
              Total Team Members
            </p>
            <span className="font-medium  text-base">12</span>
          </div>
        </div>
        <div className="divider h-px w-full bg-gray my-2"></div>
        <div className="switchTabs m-2   w-fit">
          <SwitchTabs
            data={buttons.map((button) => button.label)}
            onTabChange={handleTabChange}
          />
        </div>
        <p className="font-medium  text-base m-3">You gave access to the following members</p>
      </div>
      <div className="content mt-4">{buttons[selectedTab].component}</div>
    </div>
  );
};

export default Team;
