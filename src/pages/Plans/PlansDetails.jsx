import { Table } from "@mui/material";
import SwitchTabs from "../../Components/switchTabs/SwitchTabs";
import Button from "../../Components/UI/Button/Button";
import { BiCheckCircle } from "react-icons/bi";
import { FaCheckCircle } from "react-icons/fa";


// table data 

const tableData = [
  {
    section: "Task Management",
    features: [
      {
        name: "Customizable Workflows",
        request: false,
        requestPlus: true,
        fullPlus: true,
      },
      {
        name: "Project Planning",
        request: true,
        requestPlus: true,
        fullPlus: true,
      },
      {
        name: "Time Line",
        request: false,
        requestPlus: true,
        fullPlus: true,
      },
    ],
  },
  {
    section: "Visualization",
    features: [
      {
        name: "Gantt Charts",
        request: false,
        requestPlus: true,
        fullPlus: true,
      },
      {
        name: "Certified Extracts",
        request: false,
        requestPlus: false,
        fullPlus: true,
      },
      {
        name: "Weekly Reports",
        request: false,
        requestPlus: true,
        fullPlus: true,
      },
      {
        name: "Add team members",
        request: "3 Accounts",
        requestPlus: "6 Accounts",
        fullPlus: "9   Accounts",
      },
    ],
  },
  {
    section: "Integrations",
    features: [
      {
        name: "Number of Projects",
        request: 2,
        requestPlus: 5,
        fullPlus: 10,
      },
      {
        name: "Mobile App Integration",
        request: false,
        requestPlus: true,
        fullPlus: true,
      },
      {
        name: "Storage Space (GB)",
        request: 15,
        requestPlus: 30,
        fullPlus: 100,
      },
    ],
  },
];



const PlansDetails = () => {
  return (
    <div className="PlansDetails">
      <div className="header flex justify-between items-center">
        <div className="content">
          <h2 className="font-bold">Feature Table</h2>
          <p
            className="text-base"
            style={{
              color: "#747474",
            }}
          >
            Choose the perfect plan for your business needs
          </p>
        </div>
        <div className="switch flex items-center gap-2">
          <span className="text-purple-dark">Save 15% on yearly plan!</span>

          <SwitchTabs
            data={["Yearly", "Monthly"]}
            main_style={"bg-white"}
            activeTab_style={"!text-white"}
            movingBg_style={"bg-linear_1 "}
            //   tab_style={"!w-[150px]"}
            //   tab_moving={350}
          />
        </div>
      </div>
      <div className="plans flex items-center justify-end gap-2 mt-8">
        {["Request", "Request Plus", "Request Full Plus"].map((plan, idx) => (
          <div
            key={idx}
            className={`flex flex-col bg-white rounded-3xl p-3 border-t-2 ${
              idx === 0
                ? "border-yellow "
                : idx === 1
                ? "border-green "
                : "border-purple"
            }`}
          >
            <h3 className="font-bold text-base m-2">{plan}</h3>
            <span className="text-gold font-bold text-sm m-2">
              14 day trial
            </span>
            <p>
              <span className="text-purple text-2xl font-bold">
                {idx === 0 ? "8$" : idx === 1 ? "$16" : ""}
              </span>
              {idx === 2 ? (
                <span className="text-purple text-2xl font-bold">Custom</span>
              ) : (
                <span className="text-base font-normal">/Month</span>
              )}
            </p>
            <Button className={"mt-4 !px-24"}>Get started</Button>
          </div>
        ))}
      </div>
      <Table className="table max-w-3xl w-full mt-5">
        {tableData.map((section, secIdx) => (
          <div key={secIdx}>
            {/* Section Header Row */}
            <tr>
              <td
                className="border  p-2 font-normal text-base"
                style={{
                  background: "#E4E4E7",
                }}
                colSpan={4}
              >
                {section.section}
              </td>
            </tr>

            {/* Feature Rows */}
            {section.features.map((feature, featureIndex) => (
              <tr key={featureIndex}>
                <td className="border-b border-b-gray-300 p-2">
                  {feature.name}
                </td>
                <td className="border-b border-b-gray-300 p-2 text-center">
                  {typeof feature.request === "boolean" ? (
                    feature.request ? (
                      <FaCheckCircle className="text-green" />
                    ) : (
                      "-"
                    )
                  ) : (
                    feature.request
                  )}
                </td>
                <td className="border-b border-b-gray-300 p-2 text-center">
                  {typeof feature.requestPlus === "boolean" ? (
                    feature.requestPlus ? (
                      <FaCheckCircle className="text-green" />
                    ) : (
                      "-"
                    )
                  ) : (
                    feature.requestPlus
                  )}
                </td>
                <td className="border-b border-b-gray-300 p-2 text-center">
                  {typeof feature.fullPlus === "boolean" ? (
                    feature.fullPlus ? (
                      <FaCheckCircle className="text-green" />
                    ) : (
                      "-"
                    )
                  ) : (
                    feature.fullPlus
                  )}
                </td>
              </tr>
            ))}
          </div>
        ))}
      </Table>
    </div>
  );
};

export default PlansDetails;
