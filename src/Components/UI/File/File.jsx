import { HiOutlineDownload } from "react-icons/hi";
import { PiFilePdfFill } from "react-icons/pi";

const File = ({
  TaskName,
  Pdf_Name,
  TagName,
  style_bg,
  style_color,
  documentUrl, 
}) => {
  const downloadFile = async () => {
    try {
      const response = await fetch(documentUrl);
      const blob = await response.blob();
      const link = document.createElement("a"); 
      const url = window.URL.createObjectURL(blob); 
      link.href = url;
      link.setAttribute("download", Pdf_Name); 
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); 
      window.URL.revokeObjectURL(url); 
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  };

  return (
    <div className="File bg-white col-span-1  rounded-xl p-2 flex flex-col mb-4">
      <div className="header flex justify-between items-center p-2">
        <div className="taskName">
          <span>{TaskName}</span>
        </div>
        <button className="download" onClick={downloadFile}>
          <HiOutlineDownload className="text-blue" />
        </button>
      </div>
      <div
        className="pdf_icon m-auto w-20 h-20 flex items-center justify-center rounded-full"
        style={{
          backgroundColor: style_bg?.backgroundColor || "transparent",
        }}
      >
        <PiFilePdfFill
          className="w-9 h-9"
          style={{
            color: style_color?.color || "black",
          }}
        />
      </div>
      <div className="Pdf_Name m-auto">
        <span>{Pdf_Name}</span>
      </div>
      <div className="tagName flex justify-center">
        <span
          className="Tag w-full text-center py-2 rounded-3xl font-inter font-semibold text-sm my-2 mx-4"
          style={{
            backgroundColor: style_bg?.backgroundColor || "transparent",
            color: style_color?.color || "black",
          }}
        >
          {TagName}
        </span>
      </div>
    </div>
  );
};

export default File;
