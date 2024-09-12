import { t } from "i18next";
import { FaBars } from "react-icons/fa6";
import { RiGalleryView2 } from "react-icons/ri";
import { Link, useParams } from "react-router-dom";
import StatusHeader from "../../../Components/StatusHeader/StatusHeader";
import { IoAddOutline } from "react-icons/io5";
import "./style.scss";
import { useEffect, useState } from "react";
import { getAllTasksPerProject } from "../../../Services/api";
import BoardView from "../../../Components/boardView/boardView";
import Loader from "../../../Components/Loader/Loader";
import { format } from "date-fns";

const TasksPerProject = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterValue, setFilterValue] = useState("all");

  const buttonData = [
    { label: t("All"), value: "all" },
    { label: t("Waiting"), value: "waiting" },
    { label: t("Ongoing"), value: "ongoing" },
    { label: t("Ended"), value: "ended" },
    { label: t("Delayed"), value: "delayed" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const params =
          filterValue !== "all"
            ? { filterType: "taskStatus", filterValue }
            : {};
        const data = await getAllTasksPerProject(id, params);
        setData(data.results);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, filterValue]);

  const handleFilterChange = (value) => {
    setFilterValue(value);
  };

  const formatDate = (date) => format(new Date(date), "dd MMM");

  return (
    <div className="AllTasks">
      <h1 className="title font-inter font-bold text-3xl text-black m-2">
        {t("ProjectTasks")}
      </h1>
      <div className="GroupBtn flex items-center mx-2 my-4">
        <button className="BoardView flex items-center gap-2 p-2 border border-gray border-solid rounded-s-md font-inter font-bold text-xs text-gray-md">
          <span>
            <RiGalleryView2 className="w-4 h-3 text-gray" />
          </span>
          {t("boardView")}
        </button>
        <button className="ListView flex items-center gap-2 p-2 border border-gray border-solid font-inter font-bold text-xs text-gray-md">
          <span>
            <FaBars className="w-4 h-4 text-gray" />
          </span>
          {t("listView")}
        </button>
        <button className="ListView flex items-center gap-2 p-2 border border-gray border-solid rounded-e-md font-inter font-bold text-xs text-gray-md">
          <span>
            <FaBars className="w-4 h-4 text-gray" />
          </span>
          {t("timeLineView")}
        </button>
      </div>
      <StatusHeader buttons={buttonData} onFilterChange={handleFilterChange} />
      {loading ? (
        <Loader />
      ) : (
        <div className="content grid grid-cols-4 gap-2 mt-4">
          <Link
            to="/AddTask"
            className="AddTask box bg-white rounded-md shadow-sm p-5 flex flex-col justify-center gap-4 items-center col-span-1 h-[286px]"
          >
            <span>
              <IoAddOutline className="w-12 h-12 text-purple" />
            </span>
            <span className="text font-inter font-bold text-3xl">
              {t("AddTask")}
            </span>
          </Link>
          {data.map((task) => {
            const avatars = task.assignees.map(
              (assignee) => assignee.profilePic
            );

            return (
              <div className="task" key={task._id}>
                <Link
                  to={`/TaskDetails/${task._id}`}
                  state={{ taskId: task._id }}
                >
                  <BoardView
                    ProgressValue={70}
                    NameOfTask={task.title}
                    Tagname={task.title}
                    taskPriority={task.taskPriority}
                    status={task.taskStatus}
                    avatars={avatars}
                    filesLength={2}
                    MsgLength={6}
                    sDate={formatDate(task.startDate)}
                    eDate={formatDate(task.dueDate)}
                  />
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TasksPerProject;
