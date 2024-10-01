import { t } from "i18next";
import { FaBars } from "react-icons/fa";
import { RiGalleryView2 } from "react-icons/ri";
import { useEffect, useState } from "react";
import StatusHeader from "../../../Components/StatusHeader/StatusHeader";
import { getProjectHistory } from "../../../Services/api";
import BoardViewProject from "../../../Components/boardView/boardViewProject";
import { Link } from "react-router-dom";
import { IoAddOutline } from "react-icons/io5";
import Loader from "../../../Components/Loader/Loader";
import avatar from "../../../assets/images/Avatar.jpg"

const ProjectHistory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [Status, setStatus] = useState("all");

  const buttonData = [
    { label: t("All"), value: "all" },
    { label: t("Waiting"), value: "waiting" },
    { label: t("working"), value: "working" },
    { label: t("completed"), value: "completed" },
    { label: t("Delayed"), value: "delayed" },
  ];
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getProjectHistory(Status);
        setData(data.results);
        console.log("res with filter Status =", Status, "res => ", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [Status]);

  const handleFilterChange = (value) => {
    setStatus(value);
  };
  return (
    <div className="ProjectHistory">
      <h1 className="title font-inter font-bold text-xl lg:text-3xl text-black m-2">
        {t("ProjectHistory")}
      </h1>
      <div className="GroupBtn flex items-center mx-2 my-4">
        <button className="BoardView flex items-center gap-2 p-2 border border-gray border-solid rounded-s-md font-inter font-bold text-xs text-gray-md">
          <span>
            <RiGalleryView2 className="w-3 md:w-4 h-3 md:h-3 text-gray" />
          </span>
          {t("boardView")}
        </button>
        <button className="ListView flex items-center gap-2 p-2 border border-gray border-solid font-inter font-bold text-xs text-gray-md">
          <span>
            <FaBars className="w-3 md:w-4 h-3 md:h-3 text-gray" />
          </span>
          {t("listView")}
        </button>
        <button className="ListView flex items-center gap-2 p-2 border border-gray border-solid rounded-e-md font-inter font-bold text-xs text-gray-md">
          <span>
            <FaBars className="w-3 md:w-4 h-3 md:h-3 text-gray" />
          </span>
          {t("timeLineView")}
        </button>
      </div>
      <StatusHeader buttons={buttonData} onFilterChange={handleFilterChange} />
      {loading ? (
        <div className="Loader">
          <Loader />
        </div>
      ) : (
        <div className="content grid grid-col-1 sm:grid-cols-2 lg:grid-cols-4  gap-2 mt-4">
          <Link
            to={`/AddProject`}
            className="AddTask box h-full min-h-[280px] bg-white rounded-md shadow-sm p-5 flex flex-col justify-center gap-4 items-center col-span-1 "
          >
            <span>
              <IoAddOutline className="w-12 h-12 text-purple" />
            </span>
            <span className="text font-inter font-bold text-3xl">
              {t("AddProject")}
            </span>
          </Link>
          {data.map((Project) => {
            const avatars = Project.members.map(
              (member) => member.profilePic || avatar
            );
         

            return (
              <div className="Project" key={Project._id}>
                <Link
                  to={`/ProjectDetails/${Project._id}`}
                  state={{ projectId: Project._id }}
                >
                  <BoardViewProject
                    ProgressValue={70}
                    NameOfTask={"Project"}
                    Tagname={"title"}
                    Status={Project.status}
                    avatars={avatars }
                    filesLength={2}
                    MsgLength={6}
                    sDate={"10 jan"}
                    eDate={"12  jan"}
                    Submit={"Submitting"}
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

export default ProjectHistory;



