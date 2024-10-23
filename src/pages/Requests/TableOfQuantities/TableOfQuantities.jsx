import { useEffect, useState } from "react";
import { t } from "i18next";
import { BiTrash } from "react-icons/bi";
import {
  addTasksTable,
  getAllUnits,
  updateProject,
} from "../../../Services/api";
import Empty from "../../../Components/empty/empty";
import Input from "../../../Components/UI/Input/Input";
import Button from "../../../Components/UI/Button/Button";
import Select from "../../../Components/UI/Select/Select";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";

const TaskRow = ({
  task,
  index,
  onRemove,
  onChange,
  units,
  UnitsLoading,
  errors,
}) => {
  const handleChange = (field, value) => {
    onChange(index, field, value);
  };

  const calculateTotal = (price, requiredQuantity) => {
    const total = Number(price || 0) * Number(requiredQuantity || 0);
    handleChange("total", total);
  };

  return (
    <tr>
      <td className="w-1/3">
        <Input
          type="text"
          value={task.description}
          onChange={(e) => handleChange("description", e.target.value)}
          className={`bg-white border mx-2 border-solid focus:border-gray focus:border focus:border-solid ${
            errors[index]?.description ? "border border-red " : "border-gray"
          }`}
        />
      </td>
      <td>
        <Input
          type="number"
          min={0}
          value={task.price}
          onChange={(e) => {
            const value = e.target.value;
            handleChange("price", value);
            calculateTotal(value, task.requiredQuantity);
          }}
          className={`bg-white border mx-2 border-solid focus:border-gray focus:border focus:border-solid ${
            errors[index]?.price ? "border border-red " : "border-gray"
          }`}
        />
      </td>
      <td>
        <Input
          type="number"
          min={0}
          value={task.requiredQuantity}
          onChange={(e) => {
            const value = e.target.value;
            handleChange("requiredQuantity", value);
            calculateTotal(task.price, value);
          }}
          className={`bg-white border mx-2 border-solid focus:border-gray focus:border focus:border-solid ${
            errors[index]?.requiredQuantity ? "border border-red " : "border-gray"
          }`}
        />
      </td>
      <td>
        <input
          className="bg-white border rounded-2xl p-2 border-gray mx-2"
          type="number"
          min={0}
          value={task.total}
          disabled
        />
      </td>
      <td>
        <Select
          options={units.map((unit) => ({
            value: unit._id,
            label: unit.name,
          }))}
          placeholder="Unit"
          disabled={UnitsLoading}
          value={task.unit || ""}
          onChange={(e) => handleChange("unit", e)}
          className={`bg-white mx-4 ${
            errors[index]?.unit ? "border-b border-red rounded-3xl" : ""
          }`}
          loading={UnitsLoading}
        />
      </td>
      <td className="flex items-center gap-2 justify-center">
        <button onClick={onRemove} className="ml-2">
          <BiTrash className="text-red w-6 h-6" />
        </button>
      </td>
    </tr>
  );
};

const TableOfQuantities = () => {
  const [tasks, setTasks] = useState([]);
  const [units, setUnits] = useState([]);
  const [UnitsLoading, setUnitsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const location = useLocation();
  const { projectId } = location.state || {};
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUnits = async () => {
      setUnitsLoading(true);
      try {
        const data = await getAllUnits();
        setUnits(data.results);
      } catch (error) {
        console.error("Error fetching units:", error);
      } finally {
        setUnitsLoading(false);
      }
    };
    fetchUnits();
  }, []);

  const addNewTask = () => {
    const newTask = {
      description: "",
      price: "",
      requiredQuantity: "",
      unit: "",
      total: "",
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const removeTask = (index) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  const handleTaskChange = (index, field, value) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, [field]: value } : task
      )
    );
  };

  const validateTasks = () => {
    const newErrors = {};
    tasks.forEach((task, index) => {
      newErrors[index] = {};
      if (!task.description.trim()) newErrors[index].description = true;
      if (!task.price.trim()) newErrors[index].price = true;
      if (!task.requiredQuantity.trim())
        newErrors[index].requiredQuantity = true;
      if (!task.unit) newErrors[index].unit = true;
    });
    setErrors(newErrors);
    return Object.values(newErrors).every(
      (error) => Object.keys(error).length === 0
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateTasks()) {
      toast.error(t("Please fill all fields correctly."));
      return;
    }

    const tasksTableData = tasks.map((task) => ({
      ...task,
      project: projectId,
    }));

    try {
      const res = await addTasksTable(tasksTableData);
      toast.success(t("Tasks Added Successfully"));
      navigate("/Models", {
        state: { projectId },
        replace: true,
      });
    } catch (error) {
      console.error("Failed to add tasks:", error);
      toast.error(t("Failed to add tasks"));
    }
  };

  return (
    <div className="TableOfQuantities">
      <div className="header bg-white p-4 rounded-l-3xl flex items-center justify-between">
        <h5 className="font-bold text-base">Table of Quantities</h5>
        <button
          onClick={addNewTask}
          className="font-bold text-lg text-purple underline"
        >
          + Add New
        </button>
      </div>

      {tasks.length > 0 ? (
        <div className="content bg-white p-4 rounded-3xl my-6">
          <table>
            <thead>
              <tr>
                <th>Item Description</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Unit</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <TaskRow
                  key={index}
                  task={task}
                  index={index}
                  onRemove={() => removeTask(index)}
                  onChange={handleTaskChange}
                  units={units}
                  UnitsLoading={UnitsLoading}
                  errors={errors}
                />
              ))}
            </tbody>
          </table>
          <div className="btn flex items-center justify-center my-3">
            <Button onClick={handleSubmit}>{t("Save")}</Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-10">
          <Empty paragraph={"You haven't posted any tasks yet"} />
          <Link to="/Models" className="text-purple underline mt-4">
            Skip This Request
          </Link>
        </div>
      )}
    </div>
  );
};

export default TableOfQuantities;
