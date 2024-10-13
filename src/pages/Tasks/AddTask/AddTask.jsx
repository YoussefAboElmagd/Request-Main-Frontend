import { t } from "i18next";
import Input from "../../../Components/UI/Input/Input";
import Datepicker from "react-tailwindcss-datepicker";
import Button from "../../../Components/UI/Button/Button";
import { useEffect, useState } from "react";
import {
  addTask,
  getAllConsultants,
  getAllContractors,
  getAllOwners,
  getAllTagsByUser,
} from "../../../Services/api";
import Select from "../../../Components/UI/Select/Select";
import Loader from "../../../Components/Loader/Loader";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Models from "../../../pages/Requests/Models/Models";

const AddTask = () => {
  const { ProjectId } = useParams();
  console.log("Params =>  ", ProjectId);
  const user = useSelector((state) => state.auth.user);

  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [Name, setName] = useState("");
  const [Description, setDescription] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [SelectedStatus, setSelectedStatus] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedOwner, setSelectedOwner] = useState("");
  const [selectedContractor, setSelectedContractor] = useState("");
  const [selectedConsultant, setSelectedConsultant] = useState("");
  const [Owners, setOwners] = useState([]);
  const [OwnersLoading, setOwnersLoading] = useState(true);
  const [Contractors, setContractors] = useState([]);
  const [ContractorsLoading, setContractorsLoading] = useState(true);
  const [Consultants, setConsultants] = useState([]);
  const [ConsultantsLoading, setConsultantsLoading] = useState(true);
  const [tagsLoading, setTagsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [TaskId, setTaskId] = useState(false);
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
    owner: false,
    contractor: false,
    consultant: false,
    priority: false,
    status: false,
    tag: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ownersData = await getAllOwners();
        setOwners(
          ownersData.results.map((owner) => ({
            value: owner._id,
            label: owner.name,
          }))
        );
        setOwnersLoading(false);

        const contractorsData = await getAllContractors();
        setContractors(
          contractorsData.results.map((contractor) => ({
            value: contractor._id,
            label: contractor.name,
          }))
        );
        setContractorsLoading(false);

        const consultantsData = await getAllConsultants();
        setConsultants(
          consultantsData.results.map((consultant) => ({
            value: consultant._id,
            label: consultant.name,
          }))
        );
        setConsultantsLoading(false);

        const Tags = await getAllTagsByUser(user._id);
        setTags(
          Tags.results.map((tag) => ({
            value: tag._id,
            label: tag.name,
            colorCode: tag.colorCode,
          }))
        );
        setTagsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      }
    };

    fetchData();
  }, [user._id]);

  const priorityOptions = [
    { value: "low", label: t("low") },
    { value: "medium", label: t("medium") },
    { value: "high", label: t("high") },
  ];
  const statusOptions = [
    { value: "completed", label: t("completed") },
    { value: "working", label: t("working") },
    { value: "waiting", label: t("waiting") },
  ];

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
    setSDate({
      startDate: new Date(),
      endDate: new Date(),
    });
    setEDate({
      startDate: new Date(),
      endDate: new Date(),
    });
    setSelectedPriority("");
    setSelectedOwner("");
    setSelectedContractor("");
    setSelectedConsultant("");
    setSelectedStatus("");
    setSelectedTag("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const newFieldErrors = {
      Name: !Name.trim(),
      Description: !Description.trim(),
      sDate: !sDate.startDate,
      eDate: !eDate.endDate,
      priority: !selectedPriority,
      owner: !selectedOwner,
      contractor: !selectedContractor,
      consultant: !selectedConsultant,
      tag: !selectedTag,
    };

    setFieldErrors(newFieldErrors);

    if (Object.values(newFieldErrors).some((hasError) => hasError)) {
      setError({ message: "All fields are required." });
      return;
    }

    const formattedSDate = formatDate(sDate.startDate);
    const formattedEDate = formatDate(eDate.endDate);

    try {
      const taskData = {
        title: Name,
        description: Description,
        startDate: formattedSDate,
        project: ProjectId,
        dueDate: formattedEDate,
        owner: selectedOwner,
        contractor: selectedContractor,
        consultant: selectedConsultant,
        taskPriority: selectedPriority,
        taskStatus: SelectedStatus,
        createdBy: user._id,
        tags: "66f5762ba0c219c81a79018a",
      };

      setLoading(true);
      console.log("task data =>  ", taskData);
      const res = await addTask(taskData);
      setTaskId(res.addedTask._id);
      console.log(res);
      clearFormFields();
      setIsModalOpen(true);
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

  const handleTagChange = (selectedOptions) => {
    console.log("Selected options:", selectedOptions); // Log selected options
    setSelectedTag(selectedOptions || []); // Set selected tags or empty array if none selected
  };

  return (
    <div className="AddTask mx-1 relative">
      {Loading ? (
        <div className="flex">
          <Loader />
        </div>
      ) : (
        <>
          <h1 className="title font-inter font-bold text-3xl text-black m-2 rtl:hidden">
            {t("AddTask")}
          </h1>
          <div className="wrapper bg-white rounded-3xl p-3 m-2 ">
            <form action="submit">
              <Input
                label={t("PName")}
                placeholder={"Project Name"}
                className={`bg-white border border-purple border-solid focus:border focus:border-purple focus:border-solid ${
                  fieldErrors.Name && "border-red"
                }`}
                type={"name"}
                required={true}
                id={"name"}
                value={Name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                autoFocus={true}
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
                  } bg-white w-full rounded-xl border border-purple font-jost font-normal text-base my-2 py-2 px-4 border-solid focus:border focus:border-purple focus:border-solid`}
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
                    popoverClassName="!bg-white !border-gray-300 !shadow-md"
                    popoverDirection="up"
                    toggleClassName="text-yellow absolute top-4 ltr:right-4 rtl:left-4"
                    inputClassName={`bg-white text-gray-800 w-full rounded-xl border border-gray-300 font-jost font-normal text-base my-2 py-2 px-4 border-solid focus:border-purple focus:border-solid ${
                      fieldErrors.sDate ? "border-red border" : ""
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
                    popoverClassName="!bg-white !border-gray-300 !shadow-md"
                    popoverDirection="down"
                    toggleClassName="text-yellow absolute top-4 ltr:right-4 rtl:left-4"
                    inputClassName={`bg-white w-full rounded-xl border border-purple font-jost font-normal text-base my-2 py-2 px-4 border-solid focus:border focus:border-purple focus:border-solid ${
                      fieldErrors.eDate && "border-red border"
                    }`}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Select
                  id="priority"
                  label={t("Priority")}
                  InputClassName={`${
                    fieldErrors.priority
                      ? "border  border-red rounded-2xl "
                      : ""
                  }`}
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e)}
                  options={priorityOptions}
                  error={false}
                />

                <Select
                  id="tag"
                  label={t("tag")}
                  InputClassName={`${
                    fieldErrors.tag ? "border  border-red rounded-2xl " : ""
                  }`}
                  value={selectedTag}
                  onChange={handleTagChange}
                  options={tags}
                  isMulti
                  error={false}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Select
                  id="status"
                  label={t("status")}
                  InputClassName={`${
                    fieldErrors.status ? "border  border-red rounded-2xl " : ""
                  }`}
                  value={SelectedStatus}
                  onChange={(e) => setSelectedStatus(e)}
                  options={statusOptions}
                  error={false}
                />
                <Select
                  id="owners"
                  label={t("Owners")}
                  InputClassName={`${
                    fieldErrors.owner ? "border  border-red rounded-2xl " : ""
                  }`}
                  value={selectedOwner}
                  onChange={(e) => setSelectedOwner(e)}
                  options={Owners}
                  loading={OwnersLoading}
                  error={!!error}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Select
                  id="contractors"
                  label={t("Contractors")}
                  InputClassName={`${
                    fieldErrors.contractor
                      ? "border  border-red rounded-2xl "
                      : ""
                  }`}
                  value={selectedContractor}
                  onChange={(e) => setSelectedContractor(e)}
                  options={Contractors}
                  loading={ContractorsLoading}
                  error={!!error}
                />
                <Select
                  id="consultants"
                  label={t("Consultants")}
                  InputClassName={`${
                    fieldErrors.consultant
                      ? "border  border-red rounded-2xl "
                      : ""
                  }`}
                  value={selectedConsultant}
                  onChange={(e) => setSelectedConsultant(e)}
                  options={Consultants}
                  loading={ConsultantsLoading}
                  error={!!error}
                />
              </div>
              {isModalOpen && (
                <div className="model absolute top-0 left-0 w-full backdrop-blur-sm">
                  <Models taskId={TaskId}  />
                </div>
              )}

              {error && (
                <div className="text-red font-bold text-center p-2">
                  {t(error.message)}
                </div>
              )}
              <div className="btn flex items-center justify-center md:justify-end my-3">
                <Button onClick={handleSubmit}>{t("Next")}</Button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default AddTask;
