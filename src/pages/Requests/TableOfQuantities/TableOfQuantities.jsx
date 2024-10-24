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
import { AddNewTask } from "../../../Components/Sub_task/AddNewTask";

const TableOfQuantities = () => {
  const [tasks, setTasks] = useState([]);
  const [units, setUnits] = useState([]);
  const [UnitsLoading, setUnitsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const location = useLocation();
  const { projectId, taskType } = location.state || {};


  const navigate = useNavigate();




 

  const handleSubmit = async (e) => {
  

    try {
    
    
    } catch (error) {
      console.error("Failed to add tasks:", error);
      toast.error(t("Failed to add tasks"));
    }
  };

  return (
    <div className="TableOfQuantities">
      <div className="header bg-white p-4 rounded-l-3xl flex items-center justify-between">
        <h5 className="font-bold text-base">Table of Quantities</h5>
      
        <AddNewTask />
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
          {!taskType === "parent" && (
            <Link to="/Models" className="text-purple underline mt-4">
              Skip This Request
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default TableOfQuantities;
