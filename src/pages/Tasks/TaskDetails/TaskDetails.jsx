import { t } from "i18next";
import React, { useEffect, useState } from "react";
import Input from "../../../Components/UI/Input/Input";
import { MdCalendarToday } from "react-icons/md";
import { FaFileLines } from "react-icons/fa6";
import { IoPrint } from "react-icons/io5";
import { FaCommentMedical } from "react-icons/fa6";
import { CircularProgress } from "@mui/joy";
import { Link, useLocation } from "react-router-dom";
import { format } from "date-fns";
import Loader from "../../../Components/Loader/Loader";
import { getTaskDetails } from "../../../Services/api";
import avatar from "../../../assets/images/avatar1.png";
import Button from "../../../Components/UI/Button/Button";
import { AddNote } from "../../../Components/AddNote/AddNote";
const TaskDetails = () => {
  const [loading, setLoading] = useState(false);
  const [Task, setTask] = useState({});
  const [IsParent, setIsParent] = useState(false);
  const location = useLocation();

  const { taskId } = location.state || {};
  useEffect(() => {
    setIsParent(Task.type === "parent");
  }, [Task.type]);

  useEffect(() => {
    const fetchTask = async () => {
      setLoading(true);
      try {
        const response = await getTaskDetails(taskId);
        setTask(response.results);
        console.log(response);
      } catch (error) {
        console.error("Error fetching Task:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [taskId]);


  
 const formatDate = (date) => {
   if (!date) return "";
   return format(new Date(date), "dd/MM/yyyy");
 };  
  
  if (loading) {
    return (
      <div className="loader flex items-center justify-center m-auto">
        <Loader />
      </div>
    );
  }

  const assignee = Task.assignees && Task.assignees[0];

  return (
    <div className="TaskDetails mx-1">
      <div className="header m-2">
        <h1 className="title font-inter font-bold text-3xl text-black ">
          {Task.title}
        </h1>
        <div className="sData">
          <span className="text-purple text-sm font-medium">task started:</span>
          <span
            className="text-sm  font-semibold mx-1"
            style={{
              color: "#A9B1BF",
            }}
          >
            {formatDate(Task.sDate)}
          </span>
        </div>
      </div>

      <div className="wrapper bg-white grid grid-cols-2 rounded-3xl m-2 ">
        <div className="box relative flex justify-center items-center">
          <div className="analytics_box rounded-md shadow-sm p-8 flex flex-col gap-3 items-center">
            {Task.tags && Task.tags !== null && (
              <span
                className="font-inter font-semibold text-base text-center py-1 px-6 w-full rounded-2xl m-2"
                style={{
                  background: `${Task.tags.colorCode}40`,
                  color: Task.tags.colorCode,
                }}
              >
                {Task.tags.name}
              </span>
            )}

            <div className="progress_wrapper rounded-2xl shadow-md p-8 relative">
              <span className="absolute top-1 font-inter font-extrabold text-xs leading-4 my-1 ">
                Progress
              </span>
              <CircularProgress
                className="!text-black font-poppins font-normal text-4xl"
                determinate
                sx={{
                  "--CircularProgress-size": "180px",
                  "--CircularProgress-trackThickness": "30px",
                  "--CircularProgress-progressThickness": "30px",
                  "--CircularProgress-animationDuration": "1s",
                  "--CircularProgress-trackColor": "#F5F5F5",
                  "--CircularProgress-progressColor": "var(--purple)",
                  "--CircularProgress-trackShadowColor": "rgba(0, 0, 0, 0.12)",
                  "--CircularProgress-progressShadowColor":
                    "rgba(0, 0, 0, 0.12)",
                  "--CircularProgress-trackBorderRadius": "50%",
                  "--CircularProgress-progressBorderRadius": "50%",
                  "--CircularProgress-trackShadowBlur": "10px",
                  "--CircularProgress-progressShadowBlur": "10px",
                  "--CircularProgress-progressShadowOffset": "0px 2px",
                }}
                value={70}
                variant="solid"
              >
                70%
              </CircularProgress>
            </div>
            <div className="status_wrapper flex flex-col">
              <span
                className="Tag px-14 py-2 w-full  rounded-3xl font-inter font-semibold text-sm mt-2"
                style={{
                  background: "#FFDD9533",
                  color: "#CA8A04",
                }}
              >
                {Task.taskStatus === "working"
                  ? "Working On It"
                  : "waiting"
                  ? "Waiting For Review"
                  : "Ended"
                  ? "Completed"
                  : Task.taskStatus}
              </span>
              <span
                className={`Tag ${Task.taskPriority} px-14 py-2 w-full  rounded-3xl font-inter font-semibold text-sm mt-2 text-center`}
              >
                {Task.taskPriority}
              </span>
            </div>
          </div>
        </div>
        <div className="form m-3 mr-24">
          <Input
            type={"name"}
            required={true}
            className="bg-white border border-purple border-solid"
            label={t("PName")}
            placeholder={Task.title}
            disabled
          />
          <Input
            disabled
            required={true}
            className="bg-white border border-purple border-solid"
            label={t("sDate")}
            placeholder={formatDate(Task.sDate)}
            inputIcons={{
              element: <MdCalendarToday />,
              type: "calendar",
            }}
            iconClass={"text-yellow"}
          />
          <Input
            disabled
            required={true}
            className="bg-white border border-purple border-solid"
            label={t("dDate")}
            placeholder={formatDate(Task.dueDate)}
            inputIcons={{
              element: <MdCalendarToday />,
              type: "calendar",
            }}
            iconClass={"text-yellow"}
          />
          {Task.createdBy && (
            <div className="Tasksetter my-2">
              <p className="font-inter font-bold text-sm leading-4 my-2">
                {t("Tasksetter")}
              </p>
              <div className="flex justify-between items-center gap-1 border border-purple rounded-lg py-1  px-2">
                <div className="flex items-center gap-5">
                  <img
                    className="h-8 w-8 rounded-full"
                    src={Task.createdBy.profilePic || avatar}
                    alt="Tasksetter"
                  />

                  <span className="font-inter font-medium text-base">
                    {Task.createdBy.name}
                  </span>
                </div>

                <span className="font-inter font-medium text-base">
                  {Task.createdBy.role.name}
                </span>
              </div>
            </div>
          )}

          {assignee && (
            <div className="Responsible my-2">
              <p className="font-inter font-bold text-sm leading-4 my-2">
                {t("Responsible Person")}
              </p>
              <div className="flex justify-between items-center gap-1 border border-purple rounded-lg py-1  px-2">
                <div className="flex items-center gap-5">
                  <img
                    className="h-8 w-8 rounded-full"
                    src={assignee.profilePic || avatar}
                    alt="Tasksetter"
                  />

                  <span className="font-inter font-medium text-base">
                    {assignee.name}
                  </span>
                </div>
                {assignee.role && (
                  <span className="font-inter font-medium text-base">
                    {assignee?.role?.name}
                  </span>
                )}
              </div>
            </div>
          )}

          <div className="flex right-0 my-2 items-center justify-end">
            <button className="files flex items-center gap-1 mx-1">
              <span className="text-purple-dark font-inter font-extrabold text-sm leading-4">
                {Task?.documents?.length}
              </span>
              <FaFileLines className="text-purple-dark h-7 w-7" />
            </button>

            <AddNote taskId={Task._id} Notes={Task.notes} />
          </div>
          {IsParent && (
            <div className="flex right-0 my-2 items-center gap-3 justify-end">
              <Link
                to={`/AddTask/${Task.project._id}`}
                state={{
                  projectId: Task.project._id,
                  taskType: "sub",
                  members: Task.assignees,
                  ParentId: Task._id,
                }}
              >
                <Button className={`w-fit px-7`}>{t("AddSubTask")}</Button>
              </Link>
              <Link
                to={`/SubTasks/${Task._id}`}
                state={{
                  taskId: Task._id,
                }}
              >
                <Button
                  className={`w-fit px-7  border border-solid !border-purple !text-purple`}
                  style={{ background: "white" }}
                >
                  All sub Tasks
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="desc ">
        <h6 className="title m-2  ">{t("desc")}</h6>
        <div className="bg-white rounded-3xl m-2">
          <div
            className="content px-4 py-4 font-normal text-base "
            style={{
              color: "#A9B1BF",
            }}
          >
            {Task.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
