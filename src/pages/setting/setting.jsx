import { useState } from "react";
import Button from "../../Components/UI/Button/Button";
import General from "./General";
import Company from "./Company";
import Security from "./Security";
import Profile from "./Profile/Profile";
import CreateTag from "./Tags/CreateTag";
import "./style.scss";
import SwitchTabs from "../../Components/switchTabs/SwitchTabs";

const Setting = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const buttons = [
    { label: "General", value: "General", component: <General /> },
    { label: "Personal Profile", value: "Profile", component: <Profile /> },
    { label: "Company Information", value: "Company", component: <Company /> },
    { label: "Access & Security", value: "Security", component: <Security /> },
    { label: "Create Tags", value: "CreateTags", component: <CreateTag /> },
  ];

  const handleTabChange = (tab, index) => {
    setSelectedTab(index);
  };

  return (
    <div className="Settings">
      <div className="wrapper bg-white rounded-xl p-4 m-2">
        <div className="head flex justify-between items-center">
          <p className="font-semibold text-base">
            {buttons[selectedTab].label}
          </p>
          <div className="saveChanges">
            <Button className={"!px-12 font-medium"}>Save Changes</Button>
          </div>
        </div>
        <div className="divider h-px w-full bg-gray my-2"></div>
        <div className="switchTabs my-2">
          <SwitchTabs
            data={buttons.map((button) => button.label)}
            onTabChange={handleTabChange}
          />
        </div>
        <div className="content mt-4">{buttons[selectedTab].component}</div>
      </div>
    </div>
  );
};

export default Setting;
