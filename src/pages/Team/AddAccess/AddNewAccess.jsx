import React, { useEffect, useState } from "react";
import { BsEye, BsEyeSlash, BsFillTelephoneFill } from "react-icons/bs";
import { MdOutlinePerson } from "react-icons/md";
import { IoBagHandleOutline } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import { t } from "i18next";
import {
  getAllProjectsForUser,
  getAllVocations,
  getUserGroup,
  updateTeam,
} from "../../../Services/api";
import { useSelector } from "react-redux";
import Select, { components } from "react-select";
import { motion } from "framer-motion";
import "../style.scss";
import Button from "../../../Components/UI/Button/Button";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useCountries } from "use-react-countries";
import {
  Input as MaterialInput,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button as Btn,
} from "@material-tailwind/react";
import Loader from "../../../Components/Loader/Loader";

// Custom styles for react-select
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
  placeholder: (provided) => ({ ...provided, color: "#999" }),
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
  multiValueLabel: (provided) => ({ ...provided, color: "white" }),
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
const getErrorClass = (hasError) =>
  hasError ? "border border-red border-solid" : "";
// Reusable input component
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
  autoComplete,
  hasError,
  value
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
        autoComplete={autoComplete}
        value={value}
        required={required}
        className={`rounded-lg input relative px-3 py-2 border-gray border placeholder:font-medium placeholder:text-base placeholder:text-gray focus:bg-white ${getErrorClass(
          hasError
        )} ${className}`}
      />
      <span className="absolute right-2 top-8 w-6 h-6 text-gray">{icon}</span>
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

const AnimatedMultiValue = (props) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0.8, opacity: 0 }}
    transition={{ duration: 0.2 }}
  >
    <components.MultiValue {...props} />
  </motion.div>
);

const AddNewAccess = () => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const countries = useCountries().countries;
  const [countryIndex, setCountryIndex] = useState(230);
  const { name, flags, countryCallingCode } = countries[countryIndex];

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [projects, setProjects] = useState([]);
  const [vocations, setVocations] = useState([]);
  const [accessGroups, setAccessGroups] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedVocation, setSelectedVocation] = useState([]);
  const [selectedAccess, setSelectedAccess] = useState([]);
  const [loading, setLoading] = useState(true);
  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [Phone, setPhone] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    Name: false,
    Email: false,
    Password: false,
    Phone: false,
    vocation: false,
    project: false,
    access: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [vocationResponse, accessResponse, projectsResponse] =
          await Promise.all([
            getAllVocations(),
            getUserGroup(),
            getAllProjectsForUser(user._id, token),
          ]);

        setVocations(vocationResponse.allVocations);
        setAccessGroups(accessResponse.results);
        setProjects(projectsResponse.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user._id, token]);

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    // Remove non-digit characters
    const numericValue = value.replace(/\D/g, "");
    const codeWithoutPlus = countryCallingCode.replace("+", "");

    // Prevent user from starting the input with the country calling code
    if (value.startsWith(codeWithoutPlus)) {
      setFieldErrors({
        Phone: `Phone number cannot start with ${countryCallingCode}`,
      });
      return;
    }
    // Validate phone number length (9 or 11 digits)
    if (numericValue.length <= 11) {
      setPhone(numericValue);
    }

    // Display validation error if the number is invalid
    if (
      numericValue.length > 0 &&
      numericValue.length !== 9 &&
      numericValue.length !== 11
    ) {
      setFieldErrors("Phone number must be 9 or 11 digits long.");
    } else {
      setFieldErrors("");
    }
  };

 const clearFields = () => {
   setEmail("");
   setName("");
   setPassword("");
   setPhone("");
   setSelectedProject(null);
   setSelectedVocation([]);
   setSelectedAccess([]);
   setFieldErrors({}); 
 };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({});

    const newFieldErrors = {
      Name: !Name.trim(),
      Email: !Email.trim(),
      Password: !Password.trim(),
      Phone: !Phone.trim(),
      Access: !selectedAccess,
      Projects: !selectedProject,
      Vocations: !selectedVocation,
    };

    setFieldErrors(newFieldErrors);

    if (Object.values(newFieldErrors).some((hasError) => hasError)) {
      setFieldErrors({ message: "All fields are required." });
      return;
    }
    
    const fullPhoneNum = `${countryCallingCode}${Phone}`
    try {
      const payload = {
        name: Name,
        password: Password,
        email: Email,
        phone: fullPhoneNum,
        vocation: selectedVocation?.value,
        access: selectedAccess?.value,
        projects: selectedProject.map((p) => p.value),
        role: user.role._id,
      };
      console.log(payload);

      await updateTeam(token, user.team, payload);
      clearFields();
      toast.success("Member Added Successfully ");
    } catch (error) {
      console.log(error);
      setFieldErrors(error);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="AddNewAccess bg-white rounded-3xl m-2 p-4">
      <form
        onSubmit={handleSubmit}
        className="form grid grid-cols-4 gap-2 max-w-5xl"
      >
        <div className="col-span-4 md:col-span-2">
          <Input
            type="email"
            name="email"
            label="Email"
            placeholder="Email"
            autoComplete={"email"}
            onChange={(e) => setEmail(e.target.value)}
            value={Email}
            hasError={fieldErrors.Email}
            icon={<CiMail />}
          />
        </div>
        <div className="col-span-4 md:col-span-2">
          <Input
            type={isPasswordVisible ? "text" : "password"}
            name="password"
            label="Password"
            placeholder="Password"
            autoComplete={"new-password"}
            onChange={(e) => setPassword(e.target.value)}
            required
            value={Password}
            isPassword
            togglePasswordVisibility={togglePasswordVisibility}
          />
        </div>
        <div className="col-span-4 md:col-span-2 ">
          <Input
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
            label="Name"
            value={Name}
            placeholder="Name"
            required
            icon={<MdOutlinePerson />}
          />
        </div>
        <div className="col-span-4 md:col-span-2 relative flex mt-5  w-full">
          <Menu placement="bottom-start">
            <MenuHandler>
              <Btn
                ripple={false}
                variant="text"
                color="blue-gray"
                className="flex h-10 items-center gap-2 rounded-r-none border border-r-0 border-gray border-solid pl-3"
              >
                <img
                  src={flags.svg}
                  alt={name}
                  className="h-4 w-4 rounded-full object-cover"
                />
                {countryCallingCode}
              </Btn>
            </MenuHandler>
            <MenuList className="max-h-[20rem] max-w-[18rem]">
              {countries.map(({ name, flags, countryCallingCode }, index) => {
                return (
                  <MenuItem
                    key={name}
                    value={name}
                    className="flex items-center gap-2"
                    onClick={() => setCountryIndex(index)}
                  >
                    <img
                      src={flags.svg}
                      alt={name}
                      className="h-5 w-5 rounded-full object-cover"
                    />
                    {name} <span className="ml-auto">{countryCallingCode}</span>
                  </MenuItem>
                );
              })}
            </MenuList>
          </Menu>
          <MaterialInput
            type="tel"
            value={Phone}
            onChange={handlePhoneChange}
            placeholder="Mobile Number"
            className="rounded-l-none border border-solid !border-gray focus:!border-gray"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            containerProps={{
              className: "min-w-0",
            }}
          />
        </div>
        <div className="col-span-4">
          <label
            className="Input_label flex items-center justify-start gap-2 font-jost text-base font-medium mx-2 cursor-pointer"
            htmlFor="vocation"
          >
            Vocation
          </label>
          <Select
            placeholder="Select Vocation"
            id="vocation"
            isClearable
            isLoading={loading}
            options={vocations.map((v) => ({ value: v._id, label: v.name }))}
            onChange={setSelectedVocation}
            value={selectedVocation}
            styles={customStyles}
            components={{ MultiValue: AnimatedMultiValue }}
          />
        </div>

        <div className="col-span-4">
          <label
            className="Input_label flex items-center justify-start gap-2 font-jost text-base font-medium mx-2 cursor-pointer"
            htmlFor="access"
          >
            Access
          </label>
          <Select
            placeholder="Select Access Group"
            id="access"
            isClearable
            isLoading={loading}
            value={selectedAccess}
            options={accessGroups.map((a) => ({ value: a._id, label: a.name }))}
            onChange={setSelectedAccess}
            styles={customStyles}
            components={{ MultiValue: AnimatedMultiValue }}
          />
        </div>
        <div className="col-span-4">
          <label
            className="Input_label flex items-center justify-start gap-2 font-jost text-base font-medium mx-2 cursor-pointer"
            htmlFor="projects"
          >
            Projects
          </label>
          <Select
            placeholder="Select Projects"
            id="projects"
            isMulti
            isClearable
            isLoading={loading}
            options={projects.map((p) => ({ value: p._id, label: p.name }))}
            onChange={setSelectedProject}
            value={selectedProject}
            styles={customStyles}
            components={{ MultiValue: AnimatedMultiValue }}
          />
        </div>
        <Link className="underline underline-offset-1 text-base text-cyan-500 mx-2">
          Advanced setting
        </Link>

        {fieldErrors && (
          <div className="text-red font-bold text-center p-2">
            {t(fieldErrors.message)}
          </div>
        )}
        <div className="btn flex items-center justify-center md:justify-end col-span-4 mt-5">
          <Button onClick={handleSubmit}>{t("add")}</Button>
        </div>
      </form>
    </div>
  );
};

export default AddNewAccess;
