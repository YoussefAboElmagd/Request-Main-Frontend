import { useEffect, useState } from "react";
import { BsEye, BsEyeSlash, BsMicrosoftTeams } from "react-icons/bs";
import {
  addMemberForProject,
  getAllProjectsForUser,
  getAllTagsByUser,
  getAllVocations,
  getMembersByProject,
} from "../../../Services/api";
import { Link, useLocation } from "react-router-dom";
import ProfileAvatar from "../../../Components/UI/profilePic/profilePic";
import { useCountries } from "use-react-countries";
import { useSelector } from "react-redux";
import Loader from "../../../Components/Loader/Loader";
import { MdDelete, MdOutlinePerson } from "react-icons/md";
import { CiMail } from "react-icons/ci";
import {
  Input as MaterialInput,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Button as Btn,
  Dialog,
  DialogHeader,
  Typography,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import Select, { components, useStateManager } from "react-select";
import Button from "../../../Components/UI/Button/Button";
import { t } from "i18next";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "white",
    border: "1px solid var(--gray)",
    borderRadius: "15px",
    padding: "5px",
    minHeight: "42px",
    boxShadow: "none",
    "&:hover": { borderColor: "var(--gray)", value: false },
  }),
  placeholder: (provided) => ({ ...provided, color: "#999" }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "var(--gray)",
    "&:hover": { color: "var(--gray)", value: false },
  }),
  indicatorSeparator: () => ({ display: "none" }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: "white",
    color: "var(--gray)",
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
  pattern,
  icon,
  className,
  isPassword,
  togglePasswordVisibility,
  autoComplete,
  hasError,
  value,
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
        pattern={pattern}
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

const ProjectTeam = () => {
  const user = useSelector((state) => state.auth.user);
  const [membersData, setMembersData] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const location = useLocation();
  const { projectId } = location.state || {};
  const countries = useCountries().countries;
  const [countryIndex, setCountryIndex] = useState(230);
  const { name, flags, countryCallingCode } = countries[countryIndex];
  const [loading, setLoading] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  // const [projects, setProjects] = useState([]);
  const [vocations, setVocations] = useState([]);
  const [VocationLoading, setVocationLoading] = useState(true)
  // const [selectedProject, setSelectedProject] = useState(null);
  const [selectedVocation, setSelectedVocation] = useState([]);
  // const [selectedAccess, setSelectedAccess] = useState([]);
  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [Phone, setPhone] = useState("");
  const [Tags, setTags] = useState([]);
  const [SelectedTags, setSelectedTags] = useState([]);
  // const [isSelectOpen, setIsSelectOpen] = useState(true);
  const [TagsLoading, setTagsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    Name: false,
    Email: false,
    Password: false,
    Phone: false,
    vocation: false,
    project: false,
    access: false,
    Tag: false,
  });
  const [accessList, setAccessList] = useState({
    delete: false,
    create: false,
    edit: false,
    read: false,
  });
  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    console.log("Current access list:", accessList);
  }, [accessList]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const [
          vocationResponse,
          //  projectsResponse,
          TagsRes,
          MembersRes,
        ] = await Promise.all([
          getAllVocations(),
          // getAllProjectsForUser(user._id, token),
          getAllTagsByUser(user._id),
          getMembersByProject(projectId),
        ]);

        setVocations(vocationResponse.allVocations);
        setVocationLoading(false)

        // setProjects(projectsResponse.results);
        setTags(
          TagsRes.results.map((tag) => ({
            value: tag._id,
            label: tag.name,
            colorCode: tag.colorCode,
          }))
        );
        setTagsLoading(false);

        setMembersData(MembersRes);
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
    // setSelectedProject(null);
    setSelectedVocation([]);
    setSelectedTags([])
    accessList(
      {
        delete: false,
        create: false,
        edit: false,
        read: false,
      }
    )

    // setSelectedAccess([]);
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
      Access: !accessList,
      // Projects: !selectedProject,
      Vocations: !selectedVocation,
      Tags: !SelectedTags,
    };

    setFieldErrors(newFieldErrors);

    if (Object.values(newFieldErrors).some((hasError) => hasError)) {
      setFieldErrors({ message: "All fields are required." });
      return;
    }
    const fullPhoneNum = `${countryCallingCode}${Phone}`;
    try {
      const payload = {
        name: Name,
        password: Password,
        email: Email,
        phone: fullPhoneNum,
        vocation: selectedVocation?.value,
        access: accessList,
        // projects: selectedProject.map((p) => p.value),
        role: user.role._id,
        tags: SelectedTags.map((t) => t.value),
      };
      console.log(payload);

      await addMemberForProject(projectId, payload, token);
      clearFields();
      toast.success("Member Added Successfully ");
    } catch (error) {
      console.log(error);
      setFieldErrors(error);
    }
  };

  // const accessOptions = [
  //   { id: "read", label: "READ", value: false },
  //   { id: "write", label: "WRITE", value: false },
  //   { id: "create", label: "CREATE", value: false },
  //   { id: "delete", label: "DELETE", value: false },
  // ];

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  //  const handleChange = (selected) => {
  //    setSelectedAccess({
  //      optionSelected: selected,
  //    });
  //  };

  const changeDeleteValue = (value) => {
    setAccessList((prev) => ({
      ...prev,
      delete: value,
    }));
  };

  // Handler to change create permission
  const changeCreateValue = (value) => {
    setAccessList((prev) => ({
      ...prev,
      create: value,
    }));
  };

  // Handler to change edit permission
  const changeEditValue = (value) => {
    setAccessList((prev) => ({
      ...prev,
      edit: value,
    }));
  };

  // Handler to change read permission
  const changeReadValue = (value) => {
    setAccessList((prev) => ({
      ...prev,
      read: value,
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (loading) return <p>Loading...</p>;

  const { admins = {}, members = [], count = 0 } = membersData || {};
  const { owner, consultant, contractor } = admins;

  return (
    <div className="ProjectTeam">
      <div className="header bg-white rounded-3xl p-2">
        <div className="head flex items-center justify-between p-2">
          <h5 className="font-semibold text-base">Team</h5>
          <div className="TotalMembers flex items-center gap-2">
            <span
              className="w-7 h-7 md:w-9 md:h-9 flex items-center justify-center rounded-full"
              style={{ background: "#CCABDA" }}
            >
              <BsMicrosoftTeams className="text-purple-dark" />
            </span>
            <p
              className="font-medium md:font-semibold text-base md:text-lg"
              style={{ color: "#696A6B" }}
            >
              Total Team Members
            </p>
            <span className="font-medium text-base">{count}</span>
          </div>
        </div>
      </div>

      <div className="admins grid grid-cols-3 gap-3 my-3">
        {(owner || owner !== null) && (
          <div className="admin">
            <h4 className="m-1 font-medium text-sm">Owner</h4>
            <div className=" bg-white  flex items-center  gap-2 p-3 rounded-3xl">
              <ProfileAvatar name={owner.name} profilePic={owner.profilePic} />
              <div className="flex flex-col">
                <span className=" text-sm font-medium">{owner.name}</span>
                <span className="text-blue text-sm font-medium">
                  Owner Team
                </span>
              </div>
            </div>
          </div>
        )}
        {consultant && (
          <div className="consultant">
            <h4 className="m-1 font-medium text-sm">consultant</h4>
            <div className=" bg-white  flex items-center  gap-2 p-3 rounded-3xl">
              <ProfileAvatar
                name={consultant.name}
                profilePic={consultant.profilePic}
              />
              <div className="flex flex-col">
                <span className=" text-sm font-medium">{consultant.name}</span>
                <span className="text-blue text-sm font-medium">
                  consultant Team
                </span>
              </div>
            </div>
          </div>
        )}
        {(contractor || contractor !== null) && (
          <div className="contractor">
            <h4 className="m-1 font-medium text-sm">contractor</h4>
            <div className=" bg-white  flex items-center  gap-2 p-3 rounded-3xl">
              <ProfileAvatar
                name={contractor.name}
                profilePic={contractor.profilePic}
              />
              <div className="flex flex-col">
                <span className=" text-sm font-medium">{contractor.name}</span>
                <span className="text-blue text-sm font-medium">
                  contractor Team
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="DelegatedAccess bg-white rounded-3xl m-2 p-4">
        <table className="w-full text-sm text-center text-gray-500 border-collapse">
          <thead className="text-xs font-bold text-gray-dark uppercase border-b-2 border-gray">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Vocation</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Access</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {members.length > 0 ? (
              members.map((member) => (
                <tr key={member._id}>
                  <td className="text-left py-2 px-4 font-medium text-gray-dark">
                    {member.name}
                  </td>
                  <td className="px-4 py-2">
                    {member.vocation ? member.vocation.name : "N/A"}
                  </td>
                  <td
                    className="px-4 py-2 "
                    style={{
                      color: "#5BA6FF",
                    }}
                  >
                    {member.email}
                  </td>
                  <td
                    className="px-4 py-2 text-green"
                    style={{
                      color: "#34C759",
                    }}
                  >
                    {member.phone}
                  </td>
                  <td className="px-4 py-2">{member.access}</td>
                  <td className="px-4 py-2 flex justify-center gap-3">
                    <button
                      className="text-red"
                      onClick={() => {
                        // setSelectedUserId(member._id);
                        // setSelectedProjectId(project.projectId);
                        // handleOpen();
                      }}
                    >
                      <MdDelete className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-4 text-gray-400">
                  No members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="delete">
          <Dialog open={open} handler={handleOpen}>
            <DialogHeader>
              <Typography variant="h5" color="blue-gray">
                Your Attention is Required!
              </Typography>
            </DialogHeader>
            <DialogBody divider className="grid place-items-center gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-16 w-16 text-red-500"
              >
                <path
                  fillRule="evenodd"
                  d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.297-1.206A6.75 6.75 0 015.25 9V9zM7.5 9a4.5 4.5 0 019 0v.75a6.75 6.75 0 01-1.5 4.5v-.001A2.25 2.25 0 018.25 14a2.25 2.25 0 01-2.25-2.25V9z"
                  clipRule="evenodd"
                />
              </svg>
              <Typography variant="h6" className="text-center text-lg">
                Are you sure you want to delete this user?
              </Typography>
            </DialogBody>
            <DialogFooter>
              <Button variant="text" color="red" onClick={handleOpen}>
                Cancel
              </Button>
              <Button variant="gradient">Yes, delete</Button>
            </DialogFooter>
          </Dialog>
        </div>
      </div>

      <div className="AddNewAccess bg-white rounded-3xl m-2 p-4">
        <form
          onSubmit={handleSubmit}
          className="form grid grid-cols-4 gap-2 max-w-5xl"
        >
          <div className="col-span-4 md:col-span-2">
            <Input
              type={"email"}
              name="email"
              label="Email"
              placeholder="Email"
              autoComplete={"email"}
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
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
                      {name}{" "}
                      <span className="ml-auto">{countryCallingCode}</span>
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
              Tags
            </label>
            <Select
              placeholder="Select Tag"
              id="Tags"
              isClearable
              isLoading={TagsLoading}
              value={SelectedTags}
              options={Tags}
              onChange={setSelectedTags}
              styles={customStyles}
              isMulti
            />
          </div>

          {/* <div className="col-span-4">
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
          </div> */}
          <div className="col-span-4 flex items-center gap-5">
            <label
              className="Input_label flex items-center justify-start gap-2 font-jost text-base font-medium mx-2 cursor-pointer"
              htmlFor="access"
            >
              Access
            </label>
            {/* 
          <Select
            options={accessOptions.map((option) => ({
              value: option.id,
              label: option.label,
            }))}
            value={setSelectedAccess.optionSelected}
            isMulti
            onChange={handleChange}
            components={{ Option: CustomOption }}
            styles={customStyles}
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            classNamePrefix="select"
          /> */}
            <div className="read flex items-center gap-1 ">
              <input
                type="checkbox"
                id="read"
                checked={accessList.read}
                onChange={(e) => changeReadValue(e.target.checked)}
                className="appearance-none w-3 h-3 border border-gray rounded-sm cursor-pointer checked:bg-purple checked:border-purple duration-500"
              />
              <label htmlFor="read" className="font-medium text-base">
                Read
              </label>
            </div>
            <div className="Edit flex items-center gap-1">
              <input
                type="checkbox"
                id="Edit"
                checked={accessList.edit}
                onChange={(e) => changeEditValue(e.target.checked)}
                className="appearance-none w-3 h-3 border border-gray rounded-sm cursor-pointer checked:bg-purple checked:border-purple duration-500"
              />
              <label htmlFor="write" className="font-medium text-base">
                Edit
              </label>
            </div>
            <div className="create flex items-center gap-1">
              <input
                type="checkbox"
                id="create"
                checked={accessList.create}
                onChange={(e) => changeCreateValue(e.target.checked)}
                className="appearance-none w-3 h-3 border border-gray rounded-sm cursor-pointer checked:bg-purple checked:border-purple duration-500"
              />
              <label htmlFor="create" className="font-medium text-base">
                Create
              </label>
            </div>
            <div className="delete flex items-center gap-1">
              <input
                type="checkbox"
                id="delete"
                checked={accessList.delete}
                onChange={(e) => changeDeleteValue(e.target.checked)}
                className="appearance-none w-3 h-3 border border-gray rounded-sm cursor-pointer checked:bg-purple checked:border-purple duration-500"
              />
              <label htmlFor="delete" className="font-medium text-base">
                Delete
              </label>
            </div>
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
    </div>
  );
};

export default ProjectTeam;

//  {
//    Team.map((project) => (
//      <>
//        <tr key={project.projectId}>
//          <td
//            colSpan="6"
//            className="text-left py-3 px-4 font-medium text-gray-dark"
//          >
//            {project.projectName}
//          </td>
//        </tr>

//        {project.members.map((member) => (
//          <tr
//            key={member._id} // Use a unique identifier for keys
//            className="bg-white shadow-lg rounded-3xl my-1 border-b last:border-none"
//          >
//            <td className="px-4 py-2 flex items-center gap-3">
//              <ProfileAvatar name={member.name} profilePic={member.profilePic} />
//              <span>{member.name}</span>
//            </td>
//            <td className="px-4 py-2">
//              {member.vocation ? member.vocation.name : "N/A"}
//            </td>
//            <td
//              className="px-4 py-2 "
//              style={{
//                color: "#5BA6FF",
//              }}
//            >
//              {member.email}
//            </td>
//            <td
//              className="px-4 py-2 text-green"
//              style={{
//                color: "#34C759",
//              }}
//            >
//              {member.phone}
//            </td>
//            <td className="px-4 py-2">{member.access}</td>
//            <td className="px-4 py-2 flex justify-center gap-3">
//              <button
//                className="text-red"
//                onClick={() => {
//                  setSelectedUserId(member._id);
//                  setSelectedProjectId(project.projectId);

//                  handleOpen();
//                }}
//              >
//                <MdDelete className="w-5 h-5" />
//              </button>
//            </td>
//          </tr>
//        ))}
//      </>
//    ));
//  }
