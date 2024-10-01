import React, { useEffect, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { MdOutlinePerson } from "react-icons/md";
import { IoBagHandleOutline } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import { t } from "i18next";
import { getAllProjectsForUser, getAllTagsByUser } from "../../../Services/api";
import { useSelector } from "react-redux";
import Select ,{ components } from "react-select";
import "../style.scss"
import { motion } from "framer-motion";


const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "white",
    border: "1px solid var(--gray)",
    borderRadius: "15px",
    padding: "5px",
    minHeight: "42px",
    boxShadow: "none",
    "&:hover": { borderColor: "var(--gray)" },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#999",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "var(--gray)",
    "&:hover": { color: "var(--gray)" },
  }),
  indicatorSeparator: () => ({ display: "none" }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#CCABDA66" : "white",
    color: state.isSelected ? "var(--purple)" : "var(--gray)",
    padding: "10px",
    borderRadius: "8px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "var(--purple)",
      color: "white",
    },
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "10px",
    marginTop: "4px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "var(--purple)", 
    borderRadius: "12px",
    padding: "3px 6px",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "white", 
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: "white", 
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "var(--purple)",
      color: "var(--red)",
    },
  }),
};
// Input component
export function Input({
  type,
  onChange,
  label,
  placeholder,
  required,
  icon,
  className,
  isPassword,
  togglePasswordVisibility,
}) {
  return (
    <div className="flex flex-col relative">
      <label className="font-medium text-sm text-start text-black">
        {label}
      </label>
      <input
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`rounded-lg input relative px-3 py-1 border-gray border placeholder:font-medium placeholder:text-base placeholder:text-gray focus:bg-white ${className}`}
      />
      <span className="absolute right-2 top-7 w-6 h-6 text-gray">{icon}</span>
      {isPassword && (
        <span
          className="absolute right-2 top-7 w-6 h-6 text-gray cursor-pointer"
          onClick={togglePasswordVisibility}
        >
          {type === "password" ? <BsEyeSlash /> : <BsEye />}
        </span>
      )}
    </div>
  );
}

const AnimatedMultiValue = (props) => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <components.MultiValue {...props} />
    </motion.div>
  );
};


const AddNewAccess = () => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [Tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [Projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch tags and projects by user
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetching tags and projects in parallel
        const [tagsResponse, projectsResponse] = await Promise.all([
          getAllTagsByUser(user._id),
          getAllProjectsForUser(user._id, token),
        ]);

        // Update states with API response data
        setTags(tagsResponse.results);
        setProjects(projectsResponse.results);

        console.log("Tags:", tagsResponse);
        console.log("Projects:", projectsResponse);
      } catch (error) {
        console.error("Error fetching tags or projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="AddNewAccess bg-white rounded-3xl m-2 p-4">
      <form action="submit" className="form grid grid-cols-4 gap-2 max-w-5xl">
        <div className="col-span-2">
          <Input
            type="email"
            onChange={(e) => console.log(e.target.value)}
            label="Email"
            placeholder="email"
            required
            icon={<CiMail />}
          />
        </div>

        <div className="col-span-2">
          <Input
            type="text"
            onChange={(e) => console.log(e.target.value)}
            label="Name"
            placeholder="Name"
            required
            icon={<MdOutlinePerson />}
          />
        </div>

        <div className="col-span-2">
          <Input
            type="text"
            onChange={(e) => console.log(e.target.value)}
            label="Vocation"
            placeholder="vocation"
            required
            icon={<IoBagHandleOutline />}
          />
        </div>

        <div className="col-span-2">
          <Input
            type={isPasswordVisible ? "text" : "password"}
            onChange={(e) => console.log(e.target.value)}
            label="Password"
            placeholder="Password"
            required
            isPassword
            togglePasswordVisibility={togglePasswordVisibility}
          />
        </div>

        <div className="col-span-4">
          <label
            className="Input_label flex items-center justify-start gap-2 font-jost text-base font-medium mx-2 cursor-pointer"
            htmlFor={"access"}
          >
            Access
          </label>
          <Select
            placeholder={"Access"}
            id={"access"}
            isMulti
            isClearable
            isLoading={loading}
            value={selectedTag}
            options={Tags.map((tag) => ({
              value: tag._id,
              label: tag.name,
            }))}
            onChange={(e) => setSelectedTag(e)}
            styles={customStyles}
            components={{ MultiValue: AnimatedMultiValue }}
          />
        </div>

        <div className="col-span-4">
          <label
            className="Input_label flex items-center justify-start gap-2 font-jost text-base font-medium mx-2 cursor-pointer"
            htmlFor={"projects"}
          >
            Projects
          </label>
          <Select
            placeholder={"Projects"}
            id={"projects"}
      
            label={"Projects"}
            options={Projects.map((project) => ({
              value: project._id,
              label: project.name,
            }))}
            onChange={(e) => setSelectedProject(e)}
            value={selectedProject}
            isLoading={loading}
           
            isClearable
            styles={customStyles}
            components={{ MultiValue: AnimatedMultiValue }}
          />
        </div>
      </form>
    </div>
  );
};

export default AddNewAccess;
