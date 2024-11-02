import { TbRosetteDiscountCheck } from "react-icons/tb";
import NotificationItem from "../../Components/NotificationItem/NotificationItem";
import { IoIosWarning } from "react-icons/io";
import { PiHeadset } from "react-icons/pi";
import StatusHeader from "../../Components/StatusHeader/StatusHeader";

const Notifications = () => {

      const notifications = [
        {
          id: 1,
          icon: <TbRosetteDiscountCheck className="Notification_success" />,
          message:
            "Your package has been successfully upgraded to the higher package",
          timestamp: "12:21 PM 23-8-2024",
          showButtons: false,
        },
        {
          id: 2,
          icon: <IoIosWarning className="Notification_warning" />,
          message:
            "You have reached the maximum limit for applying to projects...",
          timestamp: "12:21 PM 23-8-2024",
          showButtons: true,
        },
        {
          id: 3,
          icon: <PiHeadset className="Notification_3" />,
          message:
            "Your complaint has been successfully submitted to support...",
          timestamp: "12:21 PM 23-8-2024",
          showButtons: false,
        },
        {
          id: 4,
          icon: <IoIosWarning className="Notification_warning" />,
          message:
            "You have reached the maximum limit for applying to projects...",
          timestamp: "12:21 PM 23-8-2024",
          showButtons: true,
        },
        {
          id: 5,
          icon: <TbRosetteDiscountCheck className="Notification_success" />,
          message:
            "Your package has been successfully upgraded to the higher package",
          timestamp: "12:21 PM 23-8-2024",
          showButtons: false,
        },
        {
          id: 6,
          icon: <PiHeadset className="Notification_3" />,
          message:
            "Your complaint has been successfully submitted to support...",
          timestamp: "12:21 PM 23-8-2024",
          showButtons: false,
        },
        {
          id: 7,
          icon: <IoIosWarning className="Notification_warning" />,
          message:
            "You have reached the maximum limit for applying to projects...",
          timestamp: "12:21 PM 23-8-2024",
          showButtons: true,
        },
        {
          id: 8,
          icon: <TbRosetteDiscountCheck className="Notification_success" />,
          message:
            "Your package has been successfully upgraded to the higher package",
          timestamp: "12:21 PM 23-8-2024",
          showButtons: false,
        },
      ];
    //   buttons 
    const buttons = [
        {
          label: "7 Days",
         
        },
        {
          label: "30 Days",
     
        },
        {
          label: "90 Days",
         
        },
      ];
 

  return (
    <div className="Notification">
      <h4 className="text-xl font-bold m-2">All notification</h4>

      <div className="content bg-white p-2 rounded-3xl h-[80vh] overflow-y-scroll">
        <div className="header my-2">
          <StatusHeader buttons={buttons} className={"bg-white"} />
        </div>
        <div className="content">
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              icon={notification.icon}
              message={notification.message}
              timestamp={notification.timestamp}
              showButtons={notification.showButtons}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
