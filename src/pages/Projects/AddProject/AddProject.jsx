import { t } from "i18next";
import Input from "../../../Components/UI/Input/Input";
import Datepicker from "react-tailwindcss-datepicker";
import Button from "../../../Components/UI/Button/Button";
import { useState } from "react";
import { addProject } from "../../../Services/api";
import Loader from "../../../Components/Loader/Loader";
import Select from "../../../Components/UI/Select/Select";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { CiLink, CiSquarePlus } from "react-icons/ci";

const AddProject = () => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [Name, setName] = useState("");
  const [Description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [priority, setPriority] = useState("");
  const [Type, setType] = useState("");
  const [InvitationMail, setInvitationMail] = useState("");
  const [Invites, setInvites] = useState([]);
  const [sDate, setSDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [eDate, setEDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [fieldErrors, setFieldErrors] = useState({
    Name: false,
    Description: false,
    sDate: false,
    eDate: false,
    budget: false,
    priority: false,
  });
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const clearFormFields = () => {
    setName("");
    setDescription("");
    setSDate(null);
    setEDate(null);
    setBudget("");
    setPriority("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validate each field and set errors
    const newFieldErrors = {
      Name: !Name.trim(),
      Description: !Description.trim(),
      sDate: !sDate.startDate,
      eDate: !eDate.endDate,
      budget: !budget.toString().trim(),
      priority:!priority,
    };

    setFieldErrors(newFieldErrors);

    // If any field has an error, set a general error message and exit
    if (Object.values(newFieldErrors).some((hasError) => hasError)) {
      setError({ message: "All fields are required." });
      return;
    }

    const formattedSDate = formatDate(sDate.startDate);
    const formattedEDate = formatDate(eDate.endDate);

    try {
      const projectData = {
        name: Name,
        description: Description,
        sDate: formattedSDate,
        dueDate: formattedEDate,
        budget: budget,
        projectPriority: priority,
        createdBy: user._id,
      };

      setLoading(true);
      console.log("Project data =>  ", projectData);
      const res = await addProject(token, projectData);
      console.log(res);
      toast.success("Project Added Successfully");
      clearFormFields();
      const projectId = res.addedProject._id;
      console.log(projectId);
      console.log(res.addedProject.members);
      

      navigate("/Requests/TableOfQuantities", {
        state: {
          projectId,
          members: res.addedProject.members,
        },
      });
    } catch (err) {
      setError({
        message: err.response ? err.response.data.message : err.message,
      });
      console.log(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const addNewInvite = () => {
    const newInvite = {};
    setInvites((prevTasks) => [...prevTasks, newInvite]);
  };

  return (
    <div className="AddProject mx-1">
      {Loading ? (
        <div className="flex">
          <Loader />
        </div>
      ) : (
        <>
          <h1 className="title font-inter font-bold text-3xl text-black m-2 rtl:hidden">
            {t("AddProject")}
          </h1>
          <div className="wrapper bg-white rounded-3xl p-3 m-2 ">
            <form action="submit">
              <Input
                label={t("PName")}
                placeholder={"Project Name"}
                className={`bg-white border border-purple  border-solid focus:border   focus:border-purple  focus:border-solid ${
                  fieldErrors.Name && "border-red"
                }`}
                type={"name"}
                required={true}
                id={"name"}
                value={Name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                autoFocus
              />
              <div className="desc">
                <label
                  htmlFor="description"
                  className="flex items-center gap-2 font-jost text-base font-medium "
                >
                  {t("desc")}
                </label>
                <textarea
                  name="description"
                  id="description"
                  placeholder={t("Description")}
                  required={true}
                  value={Description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`${
                    fieldErrors.Description && "border-red"
                  } bg-white  w-full   rounded-xl border border-purple font-jost font-normal text-base  my-2 py-2 px-4  border-solid  focus:border   focus:border-purple  focus:border-solid`}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col my-2 col-span-1">
                  <label
                    htmlFor="sDate"
                    className="flex items-center gap-2 font-jost text-base font-medium "
                  >
                    {t("sDate")}
                  </label>
                  <Datepicker
                    useRange={false}
                    asSingle={true}
                    inputId="sDate"
                    value={sDate}
                    onChange={(date) => setSDate(date)}
                    primaryColor={"purple"}
                    popoverClassName="!bg-purple-100"
                    popoverDirection="down"
                    toggleClassName="text-yellow absolute top-4 ltr:right-4 rtl:left-4"
                    inputClassName={`bg-white  w-full   rounded-xl border border-purple font-jost font-normal text-base  my-2 py-2 px-4  border-solid  focus:border   focus:border-purple  focus:border-solid ${
                      fieldErrors.sDate && "border-red"
                    }`}
                  />
                </div>
                <div className="flex flex-col my-2 col-span-1">
                  <label
                    htmlFor="dDate"
                    className="flex items-center gap-2 font-jost text-base font-medium "
                  >
                    {t("dDate")}
                  </label>
                  <Datepicker
                    useRange={false}
                    asSingle={true}
                    primaryColor={"purple"}
                    value={eDate}
                    onChange={(date) => setEDate(date)}
                    inputId="dDate"
                    popoverClassName="!bg-purple-100"
                    popoverDirection="down"
                    toggleClassName="text-yellow absolute top-4 ltr:right-4 rtl:left-4"
                    inputClassName={`bg-white  w-full   rounded-xl border border-purple font-jost font-normal text-base  my-2 py-2 px-4  border-solid  focus:border   focus:border-purple  focus:border-solid ${
                      fieldErrors.eDate && "border-red"
                    }`}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col my-2 col-span-1">
                  <Select
                    label={t("priority")}
                    isClearable
                    options={[
                      { value: "low", label: "Low" },
                      { value: "medium", label: "Medium" },
                      { value: "high", label: "High" },
                    ]}
                    className={`bg-white  ${
                      fieldErrors.priority && "border-b border-red  rounded-2xl"
                    }`}
                    value={priority}
                    onChange={(value) => setPriority(value)}
                  />
                </div>
                <div className="flex flex-col my-2 col-span-1">
                  <Input
                    label={t("budget")}
                    placeholder={"budget"}
                    className={`bg-white border border-purple  border-solid focus:border   focus:border-purple  focus:border-solid ${
                      fieldErrors.Name && "border-red"
                    }`}
                    type={"number"}
                    required={true}
                    id={"budget"}
                    min="0"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    autoFocus={true}
                  />
                </div>
              </div>

              {error && (
                <div className="text-center">
                  <p className="error text-red">{error.message}</p>
                </div>
              )}
              <div className="btn flex items-center justify-center md:justify-end my-3 gap-2">
                <button
                  className={
                    "bg-white text-purple border border-purple border-solid font-jost py-3 px-32 rounded-xl capitalize   opacity-100  disabled:opacity-50 text-base font-medium text-left"
                  }
                  onClick={handleOpen}
                >
                  {t("invite")}
                </button>
                <Button onClick={handleSubmit}>{t("Pubic")}</Button>
              </div>
            </form>
          </div>
          <div className="invite_popup">
            <Dialog open={open} handler={handleOpen}>
              <DialogBody>
                <div className="flex items-center  gap-3 ">
                  <Input
                    className="bg-white border border-purple border-solid focus:border-solid focus:border focus:border-purple w-96"
                    label={t("invite")}
                    placeholder={"Email Address"}
                    type={"email"}
                    required={true}
                    autoFocus={true}
                    onChange={(e) => setInvitationMail(e.target.value)}
                  />
                  <Select
                    label={t("type")}
                    options={[
                      { value: "owner", label: "Owner" },
                      { value: "consultant", label: "Consultant" },
                      { value: "contractor", label: "Contractor" },
                    ]}
                    value={Type}
                    onChange={(value) => setType(value)}
                  />
                  {/* add new invitation  */}
                  <button onClick={addNewInvite}>
                    <span className="text-white">
                      <CiSquarePlus className="w-10 h-10  bg-yellow text-white rounded-lg mt-4" />
                    </span>
                  </button>
                </div>
                <button className="copy text-purple-dark flex items-center gap-2 cursor-pointer mx-2">
                  <span>
                    <CiLink className="w-4 h-4" />
                  </span>
                  <span className="underline underline-offset-1">
                    Copy link
                  </span>
                </button>
                <div className="flex items-center justify-end mt-4">
                  <Button disabled={true}>{t("invite")}</Button>
                </div>
              </DialogBody>
              <DialogFooter></DialogFooter>
            </Dialog>
          </div>
        </>
      )}
    </div>
  );
};

export default AddProject;
