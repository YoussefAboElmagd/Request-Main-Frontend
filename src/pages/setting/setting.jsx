import React, { useEffect, useRef, useState } from "react";
import Button from "../../Components/UI/Button/Button";
import General from "./General/General";
import Company from "./company/Company";
import Security from "./security/Security";
import Profile from "./Profile/Profile";
import CreateTag from "./Tags/CreateTag";
import "./style.scss";
import SwitchTabs from "../../Components/switchTabs/SwitchTabs";
import { addTag } from "../../Services/api";
import { toast } from "react-toastify";
import { t } from "i18next";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

//  check input
export function CheckInput({ checked, onChange }) {
  return (
    <div className="toggle">
      <label className="label">
        <input
          className="toggle-state"
          type="checkbox"
          checked={checked}
          onChange={onChange}
        />
        <div className="toggle">
          <div className="indicator"></div>
        </div>
      </label>
    </div>
  );
}


// Debounce utility function
function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

const Setting = () => {
  const location = useLocation()
  const user = useSelector((state) => state.auth.user);
  const [selectedTab, setSelectedTab] = useState(0);
  const [tags, setTags] = useState([]);
  const profileRef = useRef();
  const generalRef = useRef();

   useEffect(() => {
     if (location.state && location.state.tabIndex !== undefined) {
       setSelectedTab(location.state.tabIndex); 
     }
   }, [location.state]);

  const saveGeneralChanges = () => {
    if (generalRef.current) {
      const settings = generalRef.current.handleSave();
      console.log("General Settings Saved:", settings);
      toast.success("General settings saved successfully!");
    }
  };

  const saveProfileChanges = () => {
    if (profileRef.current) {
      profileRef.current.handleUpdate();
    }
  };

  const saveCompanyChanges = () => {
    console.log("Saving Company Settings...");
  };

  const saveSecurityChanges = () => {
    console.log("Saving Security Settings...");
  };

  const handleSaveChanges = () => {
    const currentTab = buttons[selectedTab];
    currentTab.handleSave();
  };

  const saveCreateTagChanges = async () => {
    try {
      console.log("Saving all added tags:", tags);

      const savePromises = tags.map(async (tag) => {
        try {
          console.log("Sending tag to API:", tag);
          const response = await addTag(tag, user._id);
          console.log(`Tag added successfully:`, response);
         
          return response;
        } catch (error) {
          console.error(`Error adding tag: ${tag.name}`, error);
          throw error;
        }
      });

      const results = await Promise.all(savePromises);
      window.location.reload()
      toast.success("tags created Successfully");

      console.log("All tags saved successfully:", results);
    } catch (error) {
      console.error("Error saving tags:", error);
    }
  };

    const debouncedSaveCreateTagChanges = debounce(saveCreateTagChanges, 1000);

  const handleTagsChange = (updatedTags) => {
    setTags(updatedTags);
  };

  const buttons = [
    {
      label: t("General"),
      value: "General",
      component: <General ref={generalRef} />,
      handleSave: saveGeneralChanges,
    },
    {
      label: t("Personal Profile"),
      value: "Profile",
      component: (
        <Profile ref={profileRef} onProfileUpdate={saveProfileChanges} />
      ),
      handleSave: saveProfileChanges,
    },
    {
      label: t("Company Information"),
      value: "Company",
      component: <Company />,
      handleSave: saveCompanyChanges,
    },
    {
      label: t("Access & Security"),
      value: "Security",
      component: <Security />,
      handleSave: saveSecurityChanges,
    },
    {
      label: t("createTag"),
      value: "CreateTags",
      component: <CreateTag onTagsChange={handleTagsChange} />,
      handleSave: debouncedSaveCreateTagChanges,
    },
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
            <Button
              className={"!px-12 font-medium"}
              onClick={handleSaveChanges}
            >
              {t("Save Changes")}
            </Button>
          </div>
        </div>
        <div className="divider h-px w-full bg-gray my-2"></div>
        <div className="switchTabs my-2">
          <SwitchTabs
            data={buttons.map((button) => button.label)}
            onTabChange={handleTabChange}
            Tab={selectedTab}
          />
        </div>
        <div className="content mt-4">{buttons[selectedTab].component}</div>
      </div>
    </div>
  );
};

export default Setting;
