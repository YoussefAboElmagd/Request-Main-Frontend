import { t } from "i18next";
import Input from "../../../Components/UI/Input/Input";
import Datepicker from "react-tailwindcss-datepicker";
import Button from "../../../Components/UI/Button/Button";
import { useState } from "react";
import { addProject } from "../../../Services/api";
import Loader from "../../../Components/Loader/Loader";

const AddProject = () => {
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [Name, setName] = useState("");
  const [Description, setDescription] = useState("");
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
    // budget: false,
  });

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
    // setBudget("");
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
    // budget: !budget.toString().trim(),
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
      Name,
      Description,
      StartDate: formattedSDate,
      EndDate: formattedEDate,
      budget: 50,
    };
    setLoading(true);
    console.log("Project data =>  ", projectData);
    const res = await addProject(projectData);
    console.log(res);
    clearFormFields();
  } catch (err) {
    setError({ message: err.response ? err.response.data.message : err.message });
    console.log(err);
    setLoading(false);
  } finally {
    setLoading(false);
  }
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
           
              {error && (
                <div className="text-center">
                  <p className="error text-red">{error.message}</p>
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

export default AddProject;
