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

const AllTasks = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const buttonData = [
    { label: "All", value: "all" },
    { label: "Waiting", value: "waiting" },
    { label: "Ongoing", value: "ongoing " },
    { label: "Ended", value: "ended " },
  ];

  useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const data = await getAllTasksPerProject(id);
          setData(data.results);
          console.log(data);
          
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, []);
  return (
    <div className="AllTasks">
      <h1 className="title font-inter font-bold text-3xl text-black m-2">
        {t("ProjectTasks")}
      </h1>
      <div className="GroupBtn flex items-center  mx-2 my-4">
        <button className="BoardView flex items-center gap-2 p-2 border border-gray border-solid rounded-s-md font-inter font-bold text-xs text-gray-md">
          <span>
            <RiGalleryView2 className="w-4  h-3  text-gray" />
          </span>
          {t("boardView")}
        </button>
        <button className="ListView flex items-center gap-2 p-2 border border-gray border-solid  font-inter font-bold text-xs text-gray-md">
          <span>
            <FaBars className="w-4  h-4  text-gray" />
          </span>
          {t("listView")}
        </button>
        <button className="ListView flex items-center gap-2 p-2 border border-gray border-solid rounded-e-md font-inter font-bold text-xs text-gray-md">
          <span>
            <FaBars className="w-4  h-4  text-gray" />
          </span>
          {t("timeLineView")}
        </button>
      </div>
      <StatusHeader buttons={buttonData} />
      <div className="content grid grid-cols-4 gap-2 mt-4">
        <Link
          to={"/AddTask"}
          className="AddTask box bg-white rounded-md shadow-sm p-5 flex flex-col justify-center gap-4 items-center col-span-1"
        >
          <span>
            <IoAddOutline className="w-12 h-12 text-purple" />
          </span>
          <span className="text font-inter font-bold text-3xl">Add Task</span>
        </Link>
        {data.map((task) => (
          <div className="task" key={task._id}>
            <BoardView
              ProgressValue={70}
              NameOfTask={task.title}
              Tagname={"Project"}
              taskPriority={task.taskPriority}
              status={task.taskStatus}
              // avatars={[avatar1, avatar2]}
              filesLength={2}
              MsgLength={6}
              // sDate={formatDate(task.startDate)}
              // eDate={formatDate(task.dueDate)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTasks;
