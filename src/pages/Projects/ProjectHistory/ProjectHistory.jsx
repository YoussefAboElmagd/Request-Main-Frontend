import { t } from "i18next";
import { FaBars } from "react-icons/fa";
import { RiGalleryView2 } from "react-icons/ri";
import { useEffect, useState } from "react";
import StatusHeader from "../../../Components/StatusHeader/StatusHeader";
import { getProjectHistory } from "../../../Services/api";
import BoardViewProject from "../../../Components/boardView/boardViewProject";

const ProjectHistory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [Status, setStatus] = useState("all");

  const buttonData = [
    { label: t("All"), value: "all" },
    { label: t("Waiting"), value: "waiting" },
    { label: t("Ongoing"), value: "onGoing" },
    { label: t("Ended"), value: "ended" },
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
      <h1 className="title font-inter font-bold text-3xl text-black m-2">
        {t("ProjectHistory")}
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
      <div className="content grid grid-cols-4 gap-2 mt-4">
        <BoardViewProject
          ProgressValue={70}
          NameOfTask={"task"}
          Tagname={"title"}
          Status={"delayed"}
          // avatars={avatars}
          filesLength={2}
          MsgLength={6}
          sDate={"10 jan"}
          eDate={"12  jan"}
          Submit={"Submitting"}
        />
      </div>
    </div>
  );
};

export default ProjectHistory;
