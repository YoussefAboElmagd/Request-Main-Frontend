import { useEffect, useState } from "react";
import { t } from "i18next";
import { BiTrash } from "react-icons/bi";
import {
  addTask,
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
import { AddNewTask } from "../../../Components/Parent_task/AddNewTask";
import { EditTask } from "../../../Components/Parent_task/EditTask";

// TaskRow Component
const TaskRow = ({
  task,
  index,
  onRemove,
  onChange,
  onUpdateTask,
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
          className={`bg-white border mx-2 ${
            errors[index]?.description ? "border-red" : "border-gray"
          }`}
          disabled
        />
      </td>
      <td>
        <Input
          type="number"
          min={0}
          value={task.price}
          className={`bg-white border mx-2 ${
            errors[index]?.price ? "border-red" : "border-gray"
          }`}
          disabled
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
          className={`bg-white border mx-2 ${
            errors[index]?.quantity ? "border-red" : "border-gray"
          }`}
          disabled
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
      {/* <td>
        <Input
          type="text"
          value={task.unit}
          onChange={(e) => {
            const value = e.target.value;
            handleChange("requiredQuantity", value);
            calculateTotal(task.price, value);
          }}
          className={`bg-white border mx-2 ${
            errors[index]?.quantity ? "border-red" : "border-gray"
          }`}
          disabled
        />
      </td> */}
      <td className="flex  justify-center items-center gap-3  mt-4">
        {/* <button >
          <MdEdit className="text-blue" size={20} />
        </button> */}
        <EditTask
          task={task}
          onUpdateTask={(updatedTask) => onUpdateTask(updatedTask, index)}
        />
        <button onClick={() => onRemove(index)}>
          <BiTrash className="text-red" size={20} />
        </button>
      </td>
    </tr>
  );
};

// Main TableOfQuantities Component
const TableOfQuantities = () => {
  const [tasks, setTasks] = useState([]);
  const [units, setUnits] = useState([]);
  const [UnitsLoading, setUnitsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const location = useLocation();
  const { projectId, taskType, members, projectName } = location.state || {};
  console.log(location.state);
  const navigate = useNavigate();

  const handleNewTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  // Handle task change for a specific row
  const handleTaskChange = (index, field, value) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = { ...updatedTasks[index], [field]: value };
    setTasks(updatedTasks);
  };

  // Handle task removal
  const handleTaskRemove = (index) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  // Handle task update
  const handleUpdateTask = (updatedTask, index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = { ...updatedTasks[index], ...updatedTask };
    setTasks(updatedTasks);
  };

  const handleUpdateProject = async () => {
    try {
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
    try {
      await Promise.all(
        tasks.map(async (task) => {
          await addTask(task);
        })
      );
      toast.success(t("toast.TaskSavedSuccess"));
      console.log("All tasks saved:", tasks);
      setTasks([]);
       navigate(`/`);
      if (!taskType) {
        handleUpdateProject();
        navigate("/Models", {
          state: {
            projectId,
            projectName,
          },
        });
      }
    } catch (error) {
      console.error("Failed to add tasks:", error);
      toast.error(t(`Failed to add tasks, ${error.message}`));
    }
  };

  return (
    <div className="TableOfQuantities">
      <div className="header bg-white p-4 rounded-l-3xl flex items-center justify-between">
        <h5 className="font-bold text-base">{t("Table of Quantities")}</h5>
        <AddNewTask newTask={handleNewTask} />
      </div>

      {tasks.length > 0 ? (
        <div className="content bg-white p-4 rounded-3xl my-6">
          <table>
            <thead>
              <tr>
                <th>{t("desc")}</th>
                <th>{t("Price")}</th>
                <th>{t("Quantity")}</th>
                <th>{t("Total")}</th>
                {/* <th>Unit</th> */}
                <th>{t("Actions")}</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <TaskRow
                  key={index}
                  task={task}
                  index={index}
                  onChange={handleTaskChange}
                  onRemove={handleTaskRemove}
                  onUpdateTask={handleUpdateTask}
                  units={units}
                  UnitsLoading={UnitsLoading}
                  errors={errors}
                />
              ))}
            </tbody>
          </table>
          <div className="btn flex items-center justify-end my-3">
            <Button onClick={handleSubmit}>{t("Save")}</Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-10">
          <Empty paragraph={t("You haven't posted any tasks yet")} />
          {!taskType && (
            <Link
              to="/Models"
              state={{ projectId, taskType, members, projectName }}
              className="text-purple underline mt-4"
            >
              {t("Skip This Request")}
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default TableOfQuantities;
