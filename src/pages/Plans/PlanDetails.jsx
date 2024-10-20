import { Divider } from "@mui/material";
import React, { useState } from "react";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { FaBookmark } from "react-icons/fa";
import { IoInformationCircleOutline } from "react-icons/io5";
import Button from "../../Components/UI/Button/Button";
import Input from "../../Components/UI/Input/Input";
import { Option, Select } from "@mui/joy";
import masterCard from "../../assets/images/MasterCard.png"

const PlanDetails = () => {
  const [selectedPlan, setSelectedPlan] = useState("Request");

      const plans = [
        {
          name: "Request",
          price: "$8 USD",
          description: "Best for personal use",
          badge: "Active Plan",
          badgeColor: "bg-green text-white",
        },
        {
          name: "Request Plus",
          price: "$16",
          description: "Best for personal use",
        },
        {
          name: "Request Full Plus",
          price: "Custom",
          description: "Best for personal use",
        },
      ];
  return (
    <div className="PlanDetails bg-white p-2 rounded-3xl">
      <h2 className="font-semibold  text-xl">Subscription System</h2>
      <div className="boxes grid grid-cols-4   gap-2 mt-5 mx-2">
        <div className="package_box border border-gray py-2 px-4 rounded-xl col-span-2">
          <div className="flex my-1">
            <span className=" rounded-lg">
              <FaBookmark className="text-gold w-4 h-4   " />
            </span>
          </div>
          <h4 className="font-semibold text-sm my-1">
            You are on the Request package
          </h4>
          <p className="text-xs font-normal my-1 mr-4">
            You enjoy the monthly package. You can subscribe to the annual
            <br />
            package and save 20%.
          </p>
        </div>
        <div
          className="upgrade_box border border-purple py-2 px-4 rounded-xl col-span-2"
          style={{
            backgroundColor: "rgba(204, 171, 218, 0.09)",
          }}
        >
          <div className="flex items-center justify-between my-1">
            <span className=" rounded-lg ">
              <BsFillLightningChargeFill className="text-purple-dark w-4 h-4" />
            </span>
            <span className="bg-linear_1 py-1 px-3 text-white rounded-3xl">
              Upgrade
            </span>
          </div>
          <h4 className="font-semibold text-sm my-1">Upgrade the package</h4>
          <p className="text-xs font-normal my-1  mr-4">
            You can change the package to a larger package and enjoy greater{" "}
            <br />
            privileges
          </p>
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex items-center justify-between mt-5 mx-2">
        <div className="content">
          <h6
            style={{
              color: "#919EAB",
            }}
            className="text-xs my-1"
          >
            Current Plan
          </h6>
          <h1 className="font-bold text-2xl my-1">Starter - Jan 2024</h1>
          <p className="text-gray-md  font-medium text-sm my-1">
            You enjoy the benefits of the Request package
          </p>
          <p className="flex items-center gap-2 font-medium text-sm text-gray my-1">
            <span>
              <IoInformationCircleOutline />
            </span>
            Next Payment: <span className="text-purple">$8 USD</span> on{" "}
            <span className="text-gray-dark">Feb 1, 2024</span>
          </p>
        </div>
        <div className="flex flex-col">
          {" "}
          <h6
            style={{
              color: "#919EAB",
            }}
            className="text-xs font-bold  my-3"
          >
            Yearly Payment{" "}
          </h6>
          <span className="Price text-purple font-bold text-3xl">$8 USD</span>
          <p className="underline underline-offset-1 text-gray  font-medium  text-xs">
            Learn more about our membership
            <br /> policy
          </p>
          <Button className={"px-20 my-3"}>Change Plan</Button>
        </div>
      </div>
      <form action="submit" className="mx-2">
        <Input
          label={"Name"}
          className="bg-white border border-solid border-gray focus:border focus:border-solid focus:border-gray"
          id={"name"}
          placeholder={"Name"}
          required={true}
        />
        <div className="grid grid-cols-2">
          <div className="col-span-1"></div>
          <div className="col-span-1">
            <label
              htmlFor="Billing"
              className="Input_label flex items-center justify-start gap-2 font-jost text-base font-medium mx-2"
            >
              Billing Period
            </label>
            <Select label="Billing Period" id="Billing">
              <Option value="monthly">Monthly</Option>
              <Option value="yearly">Yearly</Option>
            </Select>
          </div>
        </div>
        <div className="flex items-center gap-2 my-1">
          <input type="checkbox" name="Notify" id="Notify" />
          <label htmlFor="Notify" className="text-sm  font-medium">
            Notify me of new offers via email{" "}
          </label>
        </div>
        <div className="flex items-center gap-2 my-1">
          <input type="checkbox" name="renewal" id="renewal" />
          <label htmlFor="renewal" className="text-sm  font-medium">
            Automatic renewal{" "}
          </label>
        </div>
        <div className="flex items-center gap-2 my-1">
          <input type="checkbox" name="Notification" id="Notification " />
          <label htmlFor="Notification" className="text-sm  font-medium">
            Notification before the package expires
          </label>
        </div>

        <Input
          label={"Days"}
          className="bg-white border border-solid border-gray focus:border focus:border-solid focus:border-gray"
          id={"Days"}
          placeholder={"Days"}
          required={true}
        />
      </form>
      <div className="payment flex items-center justify-between mx-2">
        <div className="flex flex-col">
          <h2
            style={{
              color: "#919EAB",
            }}
            className="text-xs my-1"
          >
            Payment method
          </h2>
          <div className="flex items-center gap-2">
            <img src={masterCard} alt="masterCard" className="w-16 " />
            <span className="font-bold text-xl">***8773</span>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <button className=" text-red text-sm font-medium">Remove</button>
          <button className=" font-semibold text-sm">change card</button>
        </div>
      </div>
      <div className="upgrade mx-2 mt-5">
        <h3 className="text-gold m-3 font-bold text-xl">Update Your Plan</h3>
        <h5 className=" my-3 mx-7 font-bold text-base">Change your plan</h5>
        <p className=" my-3 mx-7 font-gray font-medium text-sm">
          You can choose from one of the available plans bellow.
        </p>
        <div className="bg-white rounded-lg shadow-md p-4 w-full ">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-3 border-b ${
                index === 0 ? "border-transparent" : "border-gray-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  id={plan.name}
                  name="plan"
                  checked={selectedPlan === plan.name}
                  onChange={() => setSelectedPlan(plan.name)}
                  className="w-5 h-5 text-green focus:ring-green border-gray-300"
                />
                <div>
                  <label htmlFor={plan.name} className="text-lg font-semibold">
                    {plan.name}
                  </label>
                  <p className="text-sm text-gray">{plan.description}</p>
                </div>
                {plan.badge && (
                  <span
                    className={`text-xs px-2 py-1 rounded-md ${plan.badgeColor}`}
                  >
                    {plan.badge}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`text-lg font-bold ${
                    index === 0 ? "text-gold" : "text-black"
                  }`}
                >
                  {plan.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlanDetails;

