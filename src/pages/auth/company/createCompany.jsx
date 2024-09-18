import React, { useState } from "react";
import AuthHeader from "../../../Components/authHeader/AuthHeader";
import { BiImageAdd } from "react-icons/bi";
import { PiSignatureBold } from "react-icons/pi";
import { LiaStampSolid } from "react-icons/lia";
import Input from "../../../Components/UI/Input/Input";
import "./style.scss";
import { SignatureBtn } from "../../../Components/signature/signature";

const CreateCompany = () => {
  const [logoPreview, setLogoPreview] = useState(null);
  const [stampPreview, setStampPreview] = useState(null);

  // Function to handle image change and set preview for logo
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  // Function to handle image change and set preview for stamp
  const handleStampChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setStampPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="CreateCompany h-screen relative effect overflow-hidden">
      <AuthHeader />
      <div className="Wrapper flex items-center justify-between gap-2">
        <form action="submit" className="form flex flex-col">
          {/* Logo Input */}
          <div className="addLogo">
            <label
              htmlFor="logo"
              className="bg-white p-2 flex flex-col justify-center items-center rounded-3xl shadow-sm cursor-pointer"
            >
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Logo Preview"
                  className="w-24 h-24 object-cover rounded-full border border-solid border-purple"
                />
              ) : (
                <div
                  className="icon_wrapper rounded-full p-5 my-2 mx-4"
                  style={{
                    background: "#CCABDA33",
                  }}
                >
                  <BiImageAdd className="text-purple w-12 h-12" />
                </div>
              )}
              <span className="font-workSans font-extrabold text-xl my-2 mx-4">
                Add Logo
              </span>
            </label>
            <input
              type="file"
              name="logo"
              id="logo"
              className="hidden"
              required={true}
              onChange={handleLogoChange}
            />
          </div>

          {/* Company Name Input */}
          <div className="companyName">
            <Input
              type={"text"}
              id={"companyName"}
              name={"companyName"}
              placeholder={"Company name"}
              required={true}
              label={"Company Name"}
              className={
                "bg-white border border-solid border-purple focus:border focus:border-solid focus:border-purple px-6 font-workSans  font-bold  text-xl"
              }
              label_class={"text-purple font-workSans font-bold text-xl"}
            />
          </div>

          {/* Stamp Input */}
          <div className="stamp">
            <label
              htmlFor="stamp"
              className="box flex justify-start items-center bg-white py-1 px-6 gap-2 rounded-2xl m-2 shadow-mdc1"
            >
              <div
                className="icon_wrapper rounded-2xl p-5 my-2 mx-4"
                style={{
                  background: "#CCABDA33",
                }}
              >
                <LiaStampSolid className="text-purple w-6 h-6" />
              </div>
              {stampPreview ? (
                <img
                  src={stampPreview}
                  alt="Stamp Preview"
                  className="w-[66px] h-[62px] object-cover rounded-lg"
                />
              ) : (
                <span className="font-workSans font-semibold text-xl leading-5">
                  Electronic stamp
                </span>
              )}
            </label>
            <input
              type="file"
              name="stamp"
              id="stamp"
              className="hidden"
              required={true}
              onChange={handleStampChange}
            />
          </div>

          {/* Signature Input */}
          <div className="signature">
            <SignatureBtn />
          </div>
        </form>

        {/* Right Side Info Section */}
        <div className="w-[529px] my-40">
          <h3 className="font-workSans font-bold text-5xl leading-[56px]">
            You're just steps away from your screens
          </h3>
          <p className="font-jost font-medium text-2xl text-gray">
            Complete the following data to save time added each time
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateCompany;
