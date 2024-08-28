import React, { useState } from "react";
import { useSelector } from "react-redux";
import {  FaArrowRight, FaPencilAlt } from "react-icons/fa";
import avatar from "../../assets/images/avatar.png";
import Button from "../../Components/UI/Button/Button";
import { Popover, PopoverHandler, PopoverContent } from "@material-tailwind/react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { MdDateRange } from "react-icons/md";
 
const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const [dob, setDob] = useState(null);

  return (
    <div className="Profile">
      <h1 className="title font-inter font-bold text-3xl text-black m-2">
        Profile
      </h1>
      <div className="wrapper bg-white rounded-xl  p-4 ">
        <div className="flex gap-4">
          <div className="flex flex-col">
            <h6 className="sub_title font-inter font-medium text-base underline underline-offset-8 p-4">
              Edit profile
            </h6>
            <div className="avatar mx-4 my-2 relative">
              <img
                src={user.profilePic || avatar}
                alt="avatar"
                className="rounded-xl bg-red-200 w-24 h-24 object-contain"
              />
              <span className="bg-purple-500 absolute w-8 h-8 rounded-full flex items-center justify-center -right-2 -bottom-1 cursor-pointer">
                <FaPencilAlt className="text-white" />
              </span>
            </div>
          </div>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full ">
            <div className="flex flex-col my-2 md:col-span-2 ">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700 "
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                className=" p-2 border border-gray-300 rounded-xl "
                placeholder="Full name"
              />
            </div>
            <div className="flex flex-col my-2  md:col-span-2 ">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className=" p-2 border border-gray-300 rounded-xl "
                placeholder="email@example.com"
              />
            </div>
            <div className="flex flex-col  my-2">
              <label
                htmlFor="clientType"
                className="text-sm font-medium text-gray-700"
              >
                Client Type
              </label>
              <input
                type="text"
                id="clientType"
                className=" p-2 border border-gray-300 rounded-xl"
                placeholder="Consultant"
              />
            </div>
            <div className="flex flex-col my-2">
              <label
                htmlFor="phoneNumber"
                className="text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                className=" p-2 border border-gray-300 rounded-xl"
                placeholder="+0753235789"
              />
            </div>
            <div className="flex flex-col my-2 ">
              <label
                htmlFor="dob"
                className="text-sm font-medium text-gray-700"
              >
                Date of Birth
              </label>
              <Popover placement="bottom">
                <PopoverHandler>
                  <div className="dob relative">
                    <input
                      type="text"
                      id="dob"
                      className=" p-2 border border-gray-300 rounded-xl "
                      placeholder="Select Date"
                      value={dob ? format(dob, "PPP") : ""}                    />
                    <span className="absolute top-3 right-2 ">
                      <MdDateRange className="text-yellow w-12 h-5" />
                    </span>
                  </div>
                </PopoverHandler>
                <PopoverContent>
                  <DayPicker
                    mode="single"
                    selected={dob}
                    onSelect={setDob}
                    showOutsideDays
                    // className="border-0"
                    classNames={{
                      caption:
                        "flex justify-center py-2 mb-4 relative items-center",
                      caption_label: "text-sm font-medium text-gray",
                      nav: "flex items-center justify-between",
                      nav_button:
                        "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                      nav_button_previous: "absolute left-1.5",
                      nav_button_next: "absolute right-1.5",
                      table: "w-full border-collapse",
                      head_row: "flex font-medium text-gray-900",
                      head_cell: "m-0.5 w-9 font-normal text-sm",
                      row: "flex w-full mt-2",
                      cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                      day: "h-9 w-9 p-0 font-normal",
                      day_range_end: "day-range-end",
                      day_selected:
                        "rounded-md bg-purple text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                      day_today: "rounded-md bg-gray-dark text-white",
                      day_outside:
                        "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                      day_disabled: "text-gray-500 opacity-50",
                      day_hidden: "invisible",
                    }}
                    components={{
                      IconLeft: ({ ...props }) => (
                        <FaArrowRight
                          {...props}
                          className="h-4 w-4 stroke-2 text-gray"
                        />
                      ),
                      IconRight: ({ ...props }) => (
                        <FaArrowRight
                          {...props}
                          className="h-4 w-4 stroke-2 text-gray"
                        />
                      ),
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col my-2">
              <label
                htmlFor="address"
                className="text-sm font-medium text-gray-700"
              >
                Present Address
              </label>
              <input
                type="text"
                id="address"
                className=" p-2 border border-gray-300 rounded-xl"
                placeholder="San Jose, California, USA"
              />
            </div>
            <div className="flex flex-col my-2">
              <label
                htmlFor="city"
                className="text-sm font-medium text-gray-700"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                className=" p-2 border border-gray-300 rounded-xl"
                placeholder="City"
              />
            </div>
            <div className="flex flex-col my-2">
              <label
                htmlFor="country"
                className="text-sm font-medium text-gray-700"
              >
                Country
              </label>
              <input
                type="text"
                id="country"
                className=" p-2 border border-gray-300 rounded-xl"
                placeholder="Country"
              />
            </div>
          </form>
        </div>
        <div className="btn flex items-center justify-center md:justify-end my-3 ">
          <Button>Save</Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
