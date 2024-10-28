import { FcSimCardChip } from "react-icons/fc";
import { RiMastercardFill } from "react-icons/ri";
import { Progress } from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoTrendingDownOutline, IoTrendingUpOutline } from "react-icons/io5";

const PerformanceEvaluation = () => {
  const ProjectsPerformanceOptions = {
    series: [44, 55, 67],
    chart: {
      height: 50,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: -180,
        endAngle: 90,
        hollow: {
          margin: 5,
          size: "50%",
          background: "transparent",
          image: undefined,
        },
        dataLabels: {
          name: {
            fontSize: "16px",
          },
          value: {
            fontSize: "16px",
          },
          total: {
            show: false,
          },
        },
        rounded: true,
      },
    },
    labels: ["Completed", "In-Progress", "Delayed"],
    colors: ["#81D4C2", "#FFB926", "#FF5630"],
  };

   const weeklyActivityOptions = {
     series: [
       {
         name: "Weekly Activity",
         data: [44, 55, 41, 67, 22, 43, 21], // Adjusted data length to match categories
       },
     ],
     chart: {
       type: "bar",
       zoom: {
         enabled: false,
       },
     },
     dataLabels: {
       enabled: false,
     },
     stroke: {
       curve: "smooth", // Smooth line curve
       width: 2,
     },
     grid: {
       row: {
         colors: ["#fff", "#f2f2f2"], // Zebra colors for rows
       },
     },
     xaxis: {
       categories: [
         "Day 1",
         "Day 2",
         "Day 3",
         "Day 4",
         "Day 5",
         "Day 6",
         "Day 7", // Updated categories for a week
       ],
       title: {
         text: "Days",
       },
     },
     yaxis: {
       title: {
         text: "Servings",
       },
       min: 0, // Minimum value for y-axis
     },
     fill: {
       opacity: 1,
     },
     tooltip: {
       shared: true,
       intersect: false,
     },
   };
  return (
    <div className="PerformanceEvaluation p-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card col-span-2">
          <div className="visa-card h-[200px] rounded-2xl bg-linear_1 p-3 text-white flex flex-col">
            <div className="header flex items-center justify-between p-2">
              <div className="flex flex-col">
                <span className="text-xs font-normal">Balance</span>
                <span className="font-semibold text-xl">$5,756</span>
              </div>
              <span className="mx-2">
                <FcSimCardChip className="w-10 h-10 text-white" />
              </span>
            </div>
            <div className="content m-3 flex items-center justify-around">
              <div className="flex flex-col">
                <span className="text-xs font-normal">CARD HOLDER</span>
                <span className="font-semibold text-base">Eddy Cusuma</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-normal">VALID THRU</span>
                <span className="font-semibold text-base">12/22</span>
              </div>
            </div>
            <div className="footer mt-5 mx-3 flex justify-between items-center">
              <p>3778 **** **** 1234</p>
              <span>
                <RiMastercardFill className="w-10 h-10" />
              </span>
            </div>
          </div>
        </div>

        <div className="PackageShippingMovement col-span-2">
          <p className="font-medium text-sm mb-2">Package shipping movement</p>
          <div className="card h-[170px] bg-white rounded-2xl overflow-y-scroll overflow-x-hidden">
            <table className="w-full text-left p-4">
              <thead>
                <tr>
                  <th className="border-b text-gray font-medium text-sm p-2"></th>
                  <th className="border-b text-gray font-medium text-sm p-2">
                    Date
                  </th>
                  <th className="border-b text-gray font-medium text-sm p-2">
                    Name
                  </th>
                  <th className="border-b text-gray font-medium text-sm p-2">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array(5)
                  .fill(0)
                  .map((_, idx) => (
                    <tr key={idx} className="hover:bg-gray-100">
                      <td className="p-2" style={{ color: "#2566AF" }}>
                        VISA
                      </td>
                      <td className="p-2">12-1-2024</td>
                      <td className="p-2">Request</td>
                      <td className="p-2">$8</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 my-3">
        <div className="activeProjects col-span-2">
          <p className="font-medium text-base">Active Projects</p>
          <table className="w-full table-auto bg-white rounded-2xl overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="border-b font-medium text-sm p-2">
                  Project Name
                </th>
                <th className="border-b font-medium text-sm p-2">Tasks</th>
                <th className="border-b font-medium text-sm p-2">Progress</th>
                <th className="border-b font-medium text-sm p-2">Members</th>
              </tr>
            </thead>
            <tbody>
              {Array(5)
                .fill(0)
                .map((_, idx) => (
                  <tr key={idx} className="hover:bg-gray-100">
                    <td className="p-2">Project Name {idx + 1}</td>
                    <td className="p-2">134 Tasks</td>
                    <td className="p-2 flex items-center gap-1">
                      <span className="font-inter  text-xs text-gray-dark ">
                        15%
                      </span>
                      <Progress
                        value={70}
                        color="purple"
                        size="sm"
                        className="w-full"
                        barProps={{
                          style: {
                            height: "5px",
                            backgroundColor: "var(--purple)",
                          },
                        }}
                        style={{
                          backgroundColor: "#e0e0e0",
                          borderRadius: "5px",
                        }}
                      />
                    </td>
                    <td className="p-2">
                      <div className="flex -space-x-2">
                        {Array(3)
                          .fill(0)
                          .map((_, i) => (
                            <img
                              key={i}
                              src={`https://i.pravatar.cc/40?img=${i}`}
                              alt="member"
                              className="w-8 h-8 rounded-full border-2 border-white"
                            />
                          ))}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="bg-white p-4 shadow-lg rounded-lg col-span-2">
          <h3 className="font-semibold mb-2">Projects Performance</h3>
          <div className="flex flex-col">
            <Chart
              options={ProjectsPerformanceOptions}
              series={ProjectsPerformanceOptions.series}
              type="radialBar"
              height={180}
            />
            <div className="flex items-center justify-center gap-5 mt-2">
              <div className="Completed flex flex-col items-center">
                <span>
                  <IoMdCheckmarkCircleOutline
                    className="w-5 h-5"
                    style={{
                      color: "#81D4C2",
                    }}
                  />
                </span>
                <span className="font-semibold text-lg">44%</span>
                <span className="font-medium text-base">Completed</span>
              </div>
              <div className="In-Progress flex flex-col items-center">
                <span>
                  <IoTrendingUpOutline
                    className="w-5 h-5"
                    style={{
                      color: "#FFB926",
                    }}
                  />
                </span>
                <span className="font-semibold text-lg">55%</span>
                <span className="font-medium text-base">In-Progress</span>
              </div>
              <div className="Delayed flex flex-col items-center">
                <span>
                  <IoTrendingDownOutline
                    className="w-5 h-5"
                    style={{
                      color: "#FF5630",
                    }}
                  />
                </span>
                <span className="font-semibold text-lg">67%</span>
                <span className="font-medium text-base">Delayed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 my-3">
        <div className="weeklyActivity">
          <Chart
            options={weeklyActivityOptions}
            series={weeklyActivityOptions.series}
            type="bar"
            height={180}
          />
        </div>
      </div>
    </div>
  );
};

export default PerformanceEvaluation;

