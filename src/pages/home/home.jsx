import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RiGalleryView2 } from "react-icons/ri";
import { FaBars } from "react-icons/fa6";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import Loader from "../../Components/Loader/Loader";
import Empty from "../../Components/empty/empty";
import BoardView from "../../Components/boardView/boardView";
import header from "../../assets/images/Project.png";
import avatar1 from "../../assets/images/avatar1.png";
import avatar2 from "../../assets/images/avatar2.png";
import { getAllProjectsForUser, getAnalysis } from "../../Services/api";
import "./style.scss";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const Home = () => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const userId = user._id;

  const [data, setData] = useState({ results: [] });
  const [analysis, setAnalysis] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const analysisData = await getAnalysis(userId);
        setAnalysis(analysisData);
      } catch (error) {
        console.error("Error fetching analysis data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalysis();
  }, [userId]);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const projectsData = await getAllProjectsForUser(userId, token);
        setData(projectsData);
        console.log(projectsData);
      } catch (error) {
        console.error("Error fetching projects data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [userId, token]);

  const formatDate = (date) => format(new Date(date), "dd MMM");

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  // Filter projects that have tasks more than 0
  const filteredProjects = data.results.filter(
    (project) => project.tasks && project.tasks.length > 0
  );

  return (
    <div className="home">
      {/* Header */}
      <div className="header grid grid-cols-4 gap-2">
        <div className="box col-span-3 bg-white rounded-3xl shadow-sm p-3 flex items-center justify-between">
          <div className="content">
            <h6 className="font-poppins font-normal text-xl text-gray m-2">
              Welcome To
            </h6>
            <h5 className="font-poppins font-semibold text-2xl text-purple-dark m-2">
              Your Task Management Area
            </h5>
            <p className="font-poppins font-light text-sm leading-5 m-2 text-gray-md">
              "Your to-do list needs a boost! Try our new project management
              features"
            </p>
            <button className="mt-3 mx-2 text-white font-Poppins py-3 px-5 rounded-3xl capitalize border bg-linear_1 text-base font-medium text-left">
              Learn More
            </button>
          </div>
          <div className="image">
            <img src={header} alt="Project Header" height={180} width={245} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">{/* Task summary boxes */}</div>
      </div>

      {/* Content */}
      <div className="wrapper mt-2">
        <div className="header flex justify-between items-center">
          {/* Header Buttons */}
        </div>
        <div className="content">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <div className="project" key={project._id}>
                <Link to={`/ProjectDetails/${project._id}`}>
                  <div className="title flex items-center gap-3 m-3">
                    <p className="font-inter font-semibold text-base">
                      {project.name}
                    </p>
                    <span className="text-red font-extrabold text-xs w-6 h-6 rounded-full num flex justify-center items-center">
                      {project.taskCount}
                    </span>
                  </div>
                </Link>
                <div className="grid grid-cols-4 gap-3">
                  {project.tasks.map((task) => (
                    <div className="task" key={task._id}>
                      <BoardView
                        ProgressValue={70}
                        NameOfTask={task.title}
                        Tagname={"Project"}
                        taskPriority={task.taskPriority}
                        status={task.taskStatus}
                        avatars={[avatar1, avatar2]}
                        filesLength={2}
                        MsgLength={6}
                        sDate={formatDate(task.startDate)}
                        eDate={formatDate(task.dueDate)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="empty flex items-center justify-center mt-20">
              <Empty />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
