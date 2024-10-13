import { useEffect, useState } from "react";
import { t } from "i18next";
import { BiTrash } from "react-icons/bi";
import { addTasksTable, getAllUnits } from "../../../Services/api";
import Empty from "../../../Components/empty/empty";
import Input from "../../../Components/UI/Input/Input";
import Button from "../../../Components/UI/Button/Button";
import Select from "../../../Components/UI/Select/Select";
import { toast } from "react-toastify";

const TaskRow = ({ onRemove, units, UnitsLoading }) => {
  const [task, setTask] = useState({
    description: "",
    price: "",
    quantity: "",
    unit: "",
    total: "",
  });

  const handleChange = (field, value) => {
    setTask((prevTask) => ({
      ...prevTask,
      [field]: value,
    }));

    if (field === "price" || field === "quantity") {
      calculateTotal({ ...task, [field]: value });
    }
  };

  const calculateTotal = (updatedTask) => {
    const { price, quantity } = updatedTask;
    const total = Number(price || 0) * Number(quantity || 0);
    setTask((prevTask) => ({ ...prevTask, total }));
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
          value={task.price}
          onChange={(e) => handleChange("price", e.target.value)}
          className={`bg-white border border-gray mx-2 border-solid focus:border focus:border-gray focus:border-solid`}
        />
      </td>
      <td>
        <Input
          type="number"
          value={task.quantity}
          onChange={(e) => handleChange("quantity", e.target.value)}
          className={`bg-white border border-gray mx-2 border-solid focus:border focus:border-gray focus:border-solid`}
        />
      </td>
      <td>
        <input
          className={`bg-white border rounded-2xl p-2  border-gray mx-2 border-solid focus:border focus:border-gray focus:border-solid`}
          type="number"
          value={task.total}
          disabled
        />
      </td>
      <td>
        <Select
          options={units.map((unit) => ({
            value: unit.name,
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
  const [formErrors, setFormErrors] = useState({});
  const { projectId } = location.state || {};
  console.log(location.state);
  console.log(projectId);

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
    setTasks((prevTasks) => [...prevTasks, { id: prevTasks.length + 1 }]);
  };

  const removeTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((_, index) => index !== id));
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const tasksTableData = {
        ...tasks,
        projectId,
      };
      console.log(tasksTableData);

      const res = addTasksTable(tasksTableData);
      console.log(res);
      toast.success("Tasks Added Success");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add tasks", error);
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
                  onRemove={() => removeTask(index)}
                  units={units}
                  UnitsLoading={UnitsLoading}
                />
              ))}
            </tbody>
          </table>
          <div className="btn flex items-center justify-center md:justify-end my-3">
            <Button onClick={handleSubmit}>{t("save")}</Button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center mt-10">
          <Empty paragraph={"You haven't posted any tasks yet"} />
        </div>
      )}
    </div>
  );
};

export default TableOfQuantities;
