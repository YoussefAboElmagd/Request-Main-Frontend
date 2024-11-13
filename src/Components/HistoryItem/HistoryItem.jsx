import React from "react";
import Button from "../UI/Button/Button";
import { t } from "i18next";
import { FaXmark } from "react-icons/fa6";
import { Chip } from "@material-tailwind/react";

export const HistoryItem = ({
  title,
  message,
  timestamp,
  showButtons,
  approved,
  canceled,
  onApprove,
  onCancel,
}) => {
  return (
    <div className="HistoryItem  bg-white p-3 rounded-2xl  my-2">
      <div className="flex">
        <div className="flex-1">
          <h3 className="text-lg font-medium">{title}</h3>
        </div>
        <div className="icon ">
          <span>
            <FaXmark className="w-4 h-4" />
          </span>
        </div>
      </div>
      <div className="content flex-1">
        <p className="text-sm">{message}</p>
      </div>
      <div className="flex justify-between items-center">
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
        {approved && (
          <Chip
            value={"Approved"}
            style={{
              background: "rgba(52, 199, 89, 0.18)",
              color: "rgba(10, 159, 125, 1)",
            }}
            className="capitalize text-sm font-medium rounded-2xl"
          />
        )}
        {canceled && (
          <Chip
            value={"Canceled"}
            style={{
              background: "rgba(252, 136, 123, 0.28)",
              color: "rgba(252, 136, 123, 1)",
            }}
            className="capitalize text-sm font-medium rounded-2xl"
          />
        )}
      </div>
    </div>
  );
};
