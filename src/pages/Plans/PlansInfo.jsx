import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
} from "@mui/material";
import SwitchTabs from "../../Components/switchTabs/SwitchTabs";
import Button from "../../Components/UI/Button/Button";
import { FaCheckCircle } from "react-icons/fa";

// Table data
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
        fullPlus: "9 Accounts",
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

const PlansInfo = () => {
  return (
    <div className="PlansInfo">
      <div className="header flex justify-between items-center mb-4">
        <div className="content">
          <h2 className="font-bold text-xl">Feature Table</h2>
          <p className="text-base text-gray-500">
            Choose the perfect plan for your business needs
          </p>
        </div>
        <div className="switch flex items-center gap-2">
          <span className="text-purple-dark">Save 15% on yearly plan!</span>
          <SwitchTabs
            data={["Yearly", "Monthly"]}
            main_style={"bg-white"}
            activeTab_style={"!text-white"}
            movingBg_style={"bg-linear_1"}
          />
        </div>
      </div>

      <div className="plans flex items-center justify-end gap-4 mt-6">
        {["Request", "Request Plus", "Request Full Plus"].map((plan, idx) => (
          <div
            key={idx}
            className={`flex flex-col bg-white rounded-3xl p-4 shadow-lg border-t-4 ${
              idx === 0
                ? "border-yellow-400"
                : idx === 1
                ? "border-green-400"
                : "border-purple-400"
            }`}
          >
            <h3 className="font-bold text-lg mb-2">{plan}</h3>
            <span className="text-gold font-bold text-sm mb-2">
              14 day trial
            </span>
            <p className="flex items-center gap-1">
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

      <TableContainer  className="mt-8">
        <Table className="table w-full">
          <TableHead>
            <TableRow>
              <TableCell className="font-bold ">Feature</TableCell>
              <TableCell className="font-bold text-center ">Request</TableCell>
              <TableCell className="font-bold text-center">
                Request Plus
              </TableCell>
              <TableCell className="font-bold text-center">
                Request Full Plus
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {tableData.map((section, secIdx) => (
              <>
                <TableRow key={`section-${secIdx}`}>
                  <TableCell
                    colSpan={4}
                    className="p-3 font-semibold text-lg bg-gray-200"
                  >
                    {section.section}
                  </TableCell>
                </TableRow>
                {section.features.map((feature, featureIndex) => (
                  <TableRow key={`feature-${featureIndex}`}>
                    <TableCell className="border-b border-gray-300 p-2">
                      {feature.name}
                    </TableCell>
                    <TableCell className="border-b border-gray-300 p-2 text-center">
                      {typeof feature.request === "boolean" ? (
                        feature.request ? (
                          <FaCheckCircle className="text-green w-5 h-5" />
                        ) : (
                          "-"
                        )
                      ) : (
                        feature.request
                      )}
                    </TableCell>
                    <TableCell className="border-b border-gray-300 p-2 text-center">
                      {typeof feature.requestPlus === "boolean" ? (
                        feature.requestPlus ? (
                          <FaCheckCircle className="text-green w-5 h-5" />
                        ) : (
                          "-"
                        )
                      ) : (
                        feature.requestPlus
                      )}
                    </TableCell>
                    <TableCell className="border-b border-gray-300 p-2 text-center">
                      {typeof feature.fullPlus === "boolean" ? (
                        feature.fullPlus ? (
                          <FaCheckCircle className="text-green w-5 h-5" />
                        ) : (
                          "-"
                        )
                      ) : (
                        feature.fullPlus
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PlansInfo;
