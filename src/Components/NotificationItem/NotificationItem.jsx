import React from "react";
import Button from "../UI/Button/Button";
import { t } from "i18next";

const NotificationItem = ({
  icon,
  message,
  timestamp,
  showButtons,
  onApprove,
  onCancel,
}) => {
  return (
    <div
      className="notification-item  p-3 rounded-md flex items-start space-x-4 my-1"
      style={{
        background: "rgba(204, 171, 218, 0.1)",
      }}
    >
      <div className="icon text-2xl">
        <span>{icon}</span>
      </div>
      <div className="content flex-1">
        <p className="text-sm">{message}</p>
        <p className="text-xs text-gray-500">{timestamp}</p>
        {showButtons && (
          <div className="actions flex justify-end gap-2 space-x-2 mt-2">
            <button
              className="text-red text-base font-medium"
              onClick={onCancel}
            >
              {t("Cancel")}
            </button>
            <Button onClick={onApprove} className={"px-5 !py-2"}>
              {t("Approve")}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationItem;
