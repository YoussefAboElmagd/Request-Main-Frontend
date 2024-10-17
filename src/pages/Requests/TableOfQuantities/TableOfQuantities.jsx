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
import { useSelector } from "react-redux";

const TaskRow = ({ task, index, onRemove, onChange, units, UnitsLoading }) => {
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
          className={`bg-white border border-gray mx-2 border-solid focus:border focus:border-gray focus:border-solid`}
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
          className={`bg-white border border-gray mx-2 border-solid focus:border focus:border-gray focus:border-solid`}
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
          className={`bg-white border border-gray mx-2 border-solid focus:border focus:border-gray focus:border-solid`}
        />
      </td>
      <td>
        <input
          className={`bg-white border rounded-2xl p-2  border-gray mx-2 border-solid focus:border focus:border-gray focus:border-solid`}
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
          className="bg-white mx-4"
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
  const [errors, setErrors] = useState("");
  const location = useLocation();
  const { projectId } = location.state || {};
  console.log(projectId);
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

  // update project
  const handleUpdateProject = async () => {
    try {
      console.log("Project ID:", projectId);
      const res = await updateProject(projectId, {
        tableOfQuantities: true,
      });
      console.log("res from update project => ", res);
    } catch (error) {
      console.error("Failed to update tasks:", error);
      toast.error(t("Failed to update tasks"));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const task of tasks) {
      if (
        !task.description.trim() ||
        !task.price.trim() ||
        !task.requiredQuantity.trim() ||
        !task.unit
      ) {
        setErrors(t("Please fill all fields correctly."));
        return;
      }
    }
    const tasksTableData = tasks.map((task) => ({
      ...task,
      project: projectId,
    }));

    try {
      const res = await addTasksTable(tasksTableData);
      console.log(res);
      toast.success(t("Tasks Added Success"));
      handleUpdateProject();
      navigate("/Models", {
        state: {
          projectId,
        },
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
          className="font-bold text-lg text-purple underline underline-offset-1"
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
                />
              ))}
            </tbody>
          </table>
          {errors && (
            <p className="error-message text-center text-red">{errors}</p>
          )}
          <div className="btn flex items-center justify-center md:justify-end my-3">
            <Button onClick={handleSubmit}>{t("save")}</Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-10">
          <Empty paragraph={"You haven't posted any tasks yet"} />
          <Link className="text-purple underline mt-4" to={"/Models"} >Skip This Request</Link>
        </div>
      )}
    </div>
  );
};

export default TableOfQuantities;
