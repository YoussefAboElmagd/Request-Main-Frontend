import { t } from "i18next";
import { HistoryItem } from "../../../Components/HistoryItem/HistoryItem";


const TaskHistory = () => {
  return (
    <div className="TaskHistory">
      <h1 className="title font-inter font-bold text-3xl text-black ">
        {t("TaskHistory")}
      </h1>
      <div className="history m-2">
        <HistoryItem
          message={
            "The contractor has set a new progress rate (100%) for the task and is awaiting approval after confirming this"
          }
          timestamp="12:21 PM 23-8-2024"
          title={"New Update"}
          showButtons={true}
        />
        <HistoryItem
          message={"A new date for completing this task has been approved."}
          timestamp="12:21 PM 23-8-2024"
          title={"Update end date"}
          approved={true}
        />
        <HistoryItem
          message={
            "The request was denied. Change a new date to complete this task."
          }
          timestamp="12:21 PM 23-8-2024"
          title={"Update end date"}
          canceled={true}
        />
      </div>
    </div>
  );
};

export default TaskHistory;
