import { IoFilter } from "react-icons/io5";
import File from "../../Components/UI/File/File";
import { useEffect, useState } from "react";
import { getAllDocs } from "../../Services/api";
import Loader from "../../Components/Loader/Loader";
import { FaXmark } from "react-icons/fa6";

const DriveFiles = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const extractFileName = (url) => {
    if (typeof url === "string") {
      // Split by hyphen and filter out any empty parts
      const parts = url.split("-").filter((part) => part.trim() !== "");

      // Check if there's at least one part after splitting
      if (parts.length > 0) {
        return parts.slice(1).join("-"); // Join parts after the first element
      }
    }
    return "Unknown File";
  }; 


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getAllDocs();
        setData(data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="DriveFiles">
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <Loader />
        </div>
      ) : (
        <>
          <div className="header flex items-center justify-between">
            <h1 className="font-bold text-3xl">All Files</h1>
            <button className="bg-white p-2 rounded-lg">
              <span>
                <IoFilter className="text-purple" />
              </span>
            </button>
          </div>
          {/* <div className="filters bg-white fixed right-0  top-0 h-full w-[300px]">
            <div className="header flex items-center justify-between m-2 ">
              <span className="text-purple mx-3">Filter</span>
              <span className="close"> 
                <FaXmark className="text-purple cursor-pointer" />
              </span>
            </div>
            <div className="divider h-px w-full bg-purple my-2"></div>
          </div> */}
          <div className="divider h-px w-full bg-purple my-2"></div>
          <div className="content">
            {data.map((Project) => (
              <div key={Project._id}>
                <h6 className="Project_name font-medium text-xl">
                  {Project.name}
                </h6>
                <div className="files grid grid-cols-4 gap-3 m-2">
                  {Project.tasks.map((task) =>
                    task.documents.map((doc) => (
                      <File
                        key={doc._id}
                        Pdf_Name={extractFileName(doc.document)}
                        TagName={task.tags?.name || "No Tag"}
                        TaskName={task.title}
                        documentUrl={doc.document}
                        style_bg={{
                          backgroundColor: `${
                            task.tags?.colorCode || "#000000"
                          }40`,
                        }}
                        style_color={{
                          color: task.tags?.colorCode || "#000000",
                        }}
                      />
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DriveFiles;
