import React, { useState } from "react";
import { CiCamera } from "react-icons/ci";
import { useSelector } from "react-redux";
import Input from "../../../Components/UI/Input/Input";
import { t } from "i18next";
import { LiaStampSolid } from "react-icons/lia";
import { SignatureBtn } from "../../../Components/signature/signature";
import Button from "../../../Components/UI/Button/Button";

const Company = () => {
  const user = useSelector((state) => state.auth.user);
  const [preview, setPreview] = useState(user.companyLogo);
  const [Name, setName] = useState(user.companyName);
  const [stampPreview, setStampPreview] = useState(user.electronicStamp);
  const [signature, setSignature] = useState(null);

  const handleStampChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setStampPreview(URL.createObjectURL(file));
    }
    setStamp(file);
  };

  const handleSignatureChange = (dataUrl) => {
    setSignature(dataUrl);
  };
  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="Company">
      <div className="wrapper bg-white rounded-xl p-4 m-2">
        <div className="flex flex-col">
          <div className="avatar  my-2  mx-4 relative ">
            <img
              src={preview}
              alt="avatar"
              className="rounded-full  w-24 h-24 object-contain relative border border-solid  border-gray p-2"
            />
            <button
              onClick={() => document.getElementById("fileInput").click()}
              className="absolute  h-10 rounded-b-full flex items-center justify-center left-0  bottom-px  cursor-pointer "
              style={{
                background: "#9E9E9E",
                width: "95px",
              }}
            >
              <CiCamera className="text-white w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex flex-col ">
          <div className="companyName mx-4 my-2">
            <Input
              type={"text"}
              id={"companyName"}
              name={"companyName"}
              placeholder={Name}
              required={true}
              onChange={(e) => setName(e.target.value)}
              label={"Company Name"}
              className={
                "bg-white  border   border-solid border-gray focus:border focus:border-solid focus:border-gray px-6 font-workSans  font-bold  text-base"
              }
            />
          </div>

          <div className="stamp ">
            <label
              htmlFor="stamp"
              className="box flex justify-start items-center bg-white py-1 px-6 gap-2 rounded-2xl m-2 shadow-mdc1 shadow-lg "
            >
              <div
                className="icon_wrapper rounded-2xl p-5 my-2 mx-4"
                style={{
                  background: "#CCABDA33",
                }}
              >
                <LiaStampSolid className="text-purple w-6 h-6" />
              </div>

              <img
                src={stampPreview}
                alt="Stamp Preview"
                className="w-[66px] h-[62px] object-cover rounded-lg"
              />
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
          <div className="signature">
            <SignatureBtn onSignatureChange={handleSignatureChange} />
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 m-2">
          <Button  >
            {t("Save")}
          </Button>
        </div>
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: "none" }}
        id="fileInput"
      />
    </div>
  );
};

export default Company;
