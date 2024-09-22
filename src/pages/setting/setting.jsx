import React, { useState } from "react";
import Button from "../../Components/UI/Button/Button";
import General from "./General";
import Company from "./Company";
import Security from "./Security";
import Profile from "./Profile/Profile";
import CreateTag from "./Tags/CreateTag";
import "./style.scss";
import SwitchTabs from "../../Components/switchTabs/SwitchTabs";
import { addTag } from "../../Services/api";

const Setting = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [tags, setTags] = useState([]);

  const saveGeneralChanges = () => {
    console.log("Saving General Settings...");
  };

  const saveProfileChanges = () => {
    console.log("Saving Profile Settings...");
  };

  const saveCompanyChanges = () => {
    console.log("Saving Company Settings...");
  };

  const saveSecurityChanges = () => {
    console.log("Saving Security Settings...");
  };

  const saveCreateTagChanges = async () => {
    try {
      console.log("Saving all added tags:", tags);

      const savePromises = tags.map(async (tag) => {
        try {
          console.log("Sending tag to API:", tag); // Log the tag being sent
          const response = await addTag(tag);
          console.log(`Tag added successfully:`, response);
          return response;
        } catch (error) {
          console.error(`Error adding tag: ${tag.name}`, error);
          throw error;
        }
      });

      const results = await Promise.all(savePromises);
      console.log("All tags saved successfully:", results);
    } catch (error) {
      console.error("Error saving tags:", error);
    }
  };

  const handleTagsChange = (updatedTags) => {
    setTags(updatedTags);
  };

  const buttons = [
    {
      label: "General",
      value: "General",
      component: <General />,
      handleSave: saveGeneralChanges,
    },
    {
      label: "Personal Profile",
      value: "Profile",
      component: <Profile />,
      handleSave: saveProfileChanges,
    },
    {
      label: "Company Information",
      value: "Company",
      component: <Company />,
      handleSave: saveCompanyChanges,
    },
    {
      label: "Access & Security",
      value: "Security",
      component: <Security />,
      handleSave: saveSecurityChanges,
    },
    {
      label: "Create Tags",
      value: "CreateTags",
      component: <CreateTag onTagsChange={handleTagsChange} />,
      handleSave: saveCreateTagChanges,
    },
  ];

  const handleTabChange = (tab, index) => {
    setSelectedTab(index);
  };

  const handleSaveChanges = () => {
    const currentTab = buttons[selectedTab];
    currentTab.handleSave();
  };

  return (
    <div className="Settings">
      <div className="wrapper bg-white rounded-xl p-4 m-2">
        <div className="head flex justify-between items-center">
          <p className="font-semibold text-base">
            {buttons[selectedTab].label}
          </p>
          <div className="saveChanges">
            <Button
              className={"!px-12 font-medium"}
              onClick={handleSaveChanges}
            >
              Save Changes
            </Button>
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
