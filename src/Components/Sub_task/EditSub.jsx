import { Card, Dialog, DialogBody } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import Input from "../UI/Input/Input";
import Datepicker from "react-tailwindcss-datepicker";
import Select from "../UI/Select/Select";
import { getAllTagsByUser } from "../../Services/api";
import { useSelector } from "react-redux";
import { t } from "i18next";
import Button from "../UI/Button/Button";
import { BiEdit } from "react-icons/bi";

export const EditSub = () => {
  const user = useSelector((state) => state.auth.user);
  const userId = user._id;
  const [isOpen, setIsOpen] = useState(false);
  const [Tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    taskName: "",
    description: "",
    sDate: null,
    eDate: null,
    priority: "",
    tag: "",
    assignees: "",
    price: 0,
    quantity: 0,
    requiredQuantity: 0,
    approvedQuantity: 0,
    executedQuantity: 0,
    filteredQuantity: 0,
    total: 0,
    unit: "kg",
  });
  const [fieldErrors, setFieldErrors] = useState({});

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

  const handleOpen = () => setIsOpen(!isOpen);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getAllTagsByUser(userId);
        setTags(data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (field, date) => {
    setFormData({
      ...formData,
      [field]: date,
    });
  };

  const handleSelectChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      total: prevData.price * prevData.quantity,
    }));
  }, [formData.price, formData.quantity]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validate each field and set errors
    const newFieldErrors = {
      taskName: !formData.taskName.trim(),
      description: !formData.description.trim(),
      sDate: !formData.sDate?.startDate,
      eDate: !formData.eDate?.endDate,
      priority: !formData.priority,
      tag: !formData.tag,
      assignees: !formData.assignees,
      requiredQuantity: formData.requiredQuantity < 0,
      approvedQuantity: formData.approvedQuantity < 0,
      executedQuantity: formData.executedQuantity < 0,
      filteredQuantity: formData.filteredQuantity < 0,
      price: formData.price <= 0,
      quantity: formData.quantity <= 0,
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
    } catch (err) {
    } finally {
    }
  };
  return (
    <div className="EditSub">
      <button
        onClick={handleOpen}
        className=" font-bold text-lg text-purple  py-1 px-3"
      >
        <BiEdit className="text-purple w-6 h-6" />
      </button>
      <Dialog
        open={isOpen}
        size="lg"
        handler={handleOpen}
        className="overflow-y-scroll"
      >
        <DialogBody>
          <form onSubmit={handleSubmit}>
            <Input
              label="Task Name"
              className={`bg-white border ${
                fieldErrors.taskName ? "border-red" : "border-purple"
              } border-solid focus:border focus:border-gray focus:border-solid`}
              autoFocus
              id="name"
              placeholder="Task Name"
              type="text"
              name="taskName"
              value={formData.taskName}
              onChange={handleChange}
            />
            <div className="desc">
              <label
                htmlFor="desc"
                className="Input_label flex items-center justify-start gap-2 font-jost text-base font-medium mx-2"
              >
                Description
              </label>
              <textarea
                className={`bg-white border ${
                  fieldErrors.description ? "border-red" : "border-purple"
                } border-solid focus:border focus:border-gray focus:border-solid Input font-jost font-normal text-base my-2 py-2 px-4`}
                id="desc"
                name="description"
                rows={4}
                cols={40}
                placeholder="Details about the task that the consultant wants to tell to both the contractor and the property owner"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div className="date grid grid-cols-2 gap-3">
              <div className="sDate grid-cols-1">
                <label
                  htmlFor="sDate"
                  className="Input_label flex items-center justify-start gap-2 font-jost text-base font-medium mx-2"
                >
                  Start Date
                </label>
                <Datepicker
                  useRange={false}
                  asSingle={true}
                  inputId="sDate"
                  value={formData.sDate}
                  onChange={(date) => handleDateChange("sDate", date)}
                  primaryColor="purple"
                  popoverClassName="!bg-white !border-gray-300 !shadow-md"
                  popoverDirection="down"
                  toggleClassName="text-yellow absolute top-4 ltr:right-4 rtl:left-4"
                  inputClassName={`bg-white text-gray-800 w-full rounded-xl border ${
                    fieldErrors.sDate ? "border-red" : "border-purple"
                  } font-jost font-normal text-base my-2 py-2 px-4 border-solid focus:border-purple`}
                />
              </div>
              <div className="eDate grid-cols-1">
                <label
                  htmlFor="eDate"
                  className="Input_label flex items-center justify-start gap-2 font-jost text-base font-medium mx-2"
                >
                  Due Date
                </label>
                <Datepicker
                  useRange={false}
                  asSingle={true}
                  inputId="eDate"
                  value={formData.eDate}
                  onChange={(date) => handleDateChange("eDate", date)}
                  primaryColor="purple"
                  popoverClassName="!bg-white !border-gray-300 !shadow-md"
                  popoverDirection="down"
                  toggleClassName="text-yellow absolute top-4 ltr:right-4 rtl:left-4"
                  inputClassName="bg-white text-gray-800 w-full rounded-xl border border-purple focus:border-gray font-jost font-normal text-base my-2 py-2 px-4 border-solid focus:border-purple"
                />
              </div>
            </div>
            <div className="date grid grid-cols-2 gap-3">
              <div className="priority">
                <Select
                  label="Priority"
                  value={formData.priority}
                  onChange={(value) => handleSelectChange("priority", value)}
                  options={[
                    { label: "Low", value: "low" },
                    { label: "Medium", value: "medium" },
                    { label: "High", value: "high" },
                  ]}
                />
              </div>
              <div className="Tags">
                <Select
                  label="Tag"
                  id="tag"
                  isMulti={false}
                  value={formData.tag}
                  onChange={(value) => handleSelectChange("tag", value)}
                  options={Tags.map((tag) => ({
                    label: (
                      <div className="flex items-center justify-between">
                        <span className="text">{tag.name}</span>
                        <span
                          className="w-4 h-4 ml-2 rounded-full"
                          style={{ backgroundColor: tag.colorCode }}
                        />
                      </div>
                    ),
                    value: tag._id,
                  }))}
                />
              </div>
            </div>
            <div className="date grid grid-cols-2 gap-3">
              <div className="assignees col-span-1">
                <Select
                  label="Responsible Person"
                  id="assignees"
                  isMulti={false}
                  value={formData.tag}
                  onChange={(value) => handleSelectChange("assignees", value)}
                  options={Tags.map((tag) => ({
                    label: (
                      <div className="flex items-center justify-between">
                        <span className="text">{tag.name}</span>
                        <span
                          className="w-4 h-4 ml-2 rounded-full"
                          style={{ backgroundColor: tag.colorCode }}
                        />
                      </div>
                    ),
                    value: tag._id,
                  }))}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <div className="price col-span-1">
                <label
                  htmlFor="requiredQuantity"
                  className="Input_label flex items-center justify-start gap-2 font-jost text-base font-medium mx-2"
                >
                  Required Quantity
                </label>
                <input
                  className="bg-white border border-purple border-solid focus:border focus:border-gray focus:border-solid Input font-jost font-normal text-base my-2 py-2 px-4"
                  type="number"
                  min="0"
                  id="requiredQuantity"
                  name="requiredQuantity"
                  placeholder="Required quantity"
                  value={formData.requiredQuantity}
                  onChange={handleChange}
                />
              </div>
              <div className="Approved quantity col-span-1">
                <label
                  htmlFor="approvedQuantity"
                  className="Input_label flex items-center justify-start gap-2 font-jost text-base font-medium mx-2"
                >
                  Approved Quantity
                </label>
                <input
                  className="bg-white border border-purple border-solid focus:border focus:border-gray focus:border-solid Input font-jost font-normal text-base my-2 py-2 px-4"
                  type="number"
                  min="0"
                  id="approvedQuantity"
                  name="approvedQuantity"
                  placeholder="Approved quantity"
                  value={formData.approvedQuantity}
                  onChange={handleChange}
                />
              </div>
              <div className="Executed quantity col-span-1">
                <label
                  htmlFor="executedQuantity"
                  className="Input_label flex items-center justify-start gap-2 font-jost text-base font-medium mx-2"
                >
                  Executed Quantity
                </label>
                <input
                  className="bg-white border border-purple border-solid focus:border focus:border-gray focus:border-solid Input font-jost font-normal text-base my-2 py-2 px-4"
                  type="number"
                  min="0"
                  id="executedQuantity"
                  name="executedQuantity"
                  placeholder="Executed quantity"
                  value={formData.executedQuantity}
                  onChange={handleChange}
                />
              </div>
              <div className="Filtered quantity col-span-1">
                <label
                  htmlFor="filteredQuantity"
                  className="Input_label flex items-center justify-start gap-2 font-jost text-base font-medium mx-2"
                >
                  Filtered Quantity
                </label>
                <input
                  className="bg-white border border-purple border-solid focus:border focus:border-gray focus:border-solid Input font-jost font-normal text-base my-2 py-2 px-4"
                  type="number"
                  min="0"
                  id="filteredQuantity"
                  name="filteredQuantity"
                  placeholder="Filtered quantity"
                  value={formData.filteredQuantity}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              <div className="price col-span-1">
                <label
                  htmlFor="price"
                  className="Input_label flex items-center justify-start gap-2 font-jost text-base font-medium mx-2"
                >
                  Price
                </label>
                <input
                  className="bg-white border border-purple border-solid focus:border focus:border-gray focus:border-solid Input font-jost font-normal text-base my-2 py-2 px-4 "
                  type="number"
                  min="0"
                  id="price"
                  name="price"
                  placeholder="Price"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>
              <div className="Quantity col-span-1">
                <label
                  htmlFor="quantity"
                  className="Input_label flex items-center justify-start gap-2 font-jost text-base font-medium mx-2"
                >
                  Quantity
                </label>
                <input
                  className="bg-white border border-purple border-solid focus:border focus:border-gray focus:border-solid Input font-jost font-normal text-base my-2 py-2 px-4 "
                  type="number"
                  min="0"
                  id="quantity"
                  name="quantity"
                  placeholder="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                />
              </div>
              <div className="Total col-span-1">
                <label
                  htmlFor="Total"
                  className="Input_label flex items-center justify-start gap-2 font-jost text-base font-medium mx-2"
                >
                  Total
                </label>
                <input
                  className="bg-white border border-purple border-solid focus:border focus:border-gray focus:border-solid Input font-jost font-normal text-base my-2 py-2 px-4 "
                  type="number"
                  min="0"
                  id="Total"
                  name="Total"
                  placeholder="Total"
                  value={formData.total}
                  disabled
                  onChange={handleChange}
                />
              </div>
              <div className="Unit col-span-1">
                <label
                  htmlFor="unit"
                  className="Input_label flex items-center justify-start gap-2 font-jost text-base font-medium mx-2"
                >
                  Unit
                </label>
                <Select
                  type="number"
                  min="0"
                  id="unit"
                  name="unit"
                  placeholder="unit"
                  value={formData.unit}
                  onChange={(value) => handleSelectChange("unit", value)}
                  options={[
                    { label: "Kg", value: "kg" },
                    { label: "L", value: "l" },
                  ]}
                />
              </div>
            </div>
            <div className="btn flex items-center justify-center md:justify-end my-3">
              <Button type="submit">{t("confirm")}</Button>
            </div>
          </form>
        </DialogBody>
      </Dialog>
    </div>
  );
};




 {
   /* <div className="grid grid-cols-4 gap-2">
              <div className="price col-span-1">
                <label
                  htmlFor="requiredQuantity"
                  className="Input_label flex items-center justify-start gap-2 font-jost text-base font-medium mx-2"
                >
                  Required Quantity
                </label>
                <input
                  className="bg-white border border-purple border-solid focus:border focus:border-gray focus:border-solid Input font-jost font-normal text-base my-2 py-2 px-4"
                  type="number"
                  min="0"
                  id="requiredQuantity"
                  name="requiredQuantity"
                  placeholder="Required quantity"
                  value={formData.requiredQuantity}
                  onChange={handleChange}
                />
              </div>
              <div className="Approved quantity col-span-1">
                <label
                  htmlFor="approvedQuantity"
                  className="Input_label flex items-center justify-start gap-2 font-jost text-base font-medium mx-2"
                >
                  Approved Quantity
                </label>
                <input
                  className="bg-white border border-purple border-solid focus:border focus:border-gray focus:border-solid Input font-jost font-normal text-base my-2 py-2 px-4"
                  type="number"
                  min="0"
                  id="approvedQuantity"
                  name="approvedQuantity"
                  placeholder="Approved quantity"
                  value={formData.approvedQuantity}
                  onChange={handleChange}
                />
              </div>
              <div className="Executed quantity col-span-1">
                <label
                  htmlFor="executedQuantity"
                  className="Input_label flex items-center justify-start gap-2 font-jost text-base font-medium mx-2"
                >
                  Executed Quantity
                </label>
                <input
                  className="bg-white border border-purple border-solid focus:border focus:border-gray focus:border-solid Input font-jost font-normal text-base my-2 py-2 px-4"
                  type="number"
                  min="0"
                  id="executedQuantity"
                  name="executedQuantity"
                  placeholder="Executed quantity"
                  value={formData.executedQuantity}
                  onChange={handleChange}
                />
              </div>
              <div className="Filtered quantity col-span-1">
                <label
                  htmlFor="filteredQuantity"
                  className="Input_label flex items-center justify-start gap-2 font-jost text-base font-medium mx-2"
                >
                  Filtered Quantity
                </label>
                <input
                  className="bg-white border border-purple border-solid focus:border focus:border-gray focus:border-solid Input font-jost font-normal text-base my-2 py-2 px-4"
                  type="number"
                  min="0"
                  id="filteredQuantity"
                  name="filteredQuantity"
                  placeholder="Filtered quantity"
                  value={formData.filteredQuantity}
                  onChange={handleChange}
                />
              </div>
            </div> */
 }