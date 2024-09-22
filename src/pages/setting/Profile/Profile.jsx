import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPencilAlt } from "react-icons/fa";
import { CiCamera } from "react-icons/ci";
import Button from "../../../Components/UI/Button/Button";
import { t } from "i18next";
import { handleUpdateUser } from "../../../redux/services/authServices";
import UiInput from "../../../Components/UI/Input/UIInput";
import Datepicker from "react-tailwindcss-datepicker";
import Alert from "../../../Components/Alert/Alert";
import { TfiLock } from "react-icons/tfi";
import "./style.scss"

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [dob, setDob] = useState(user.dateOfBirth);
  const [Name, setName] = useState(user.name);
  const [Email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role.name);
  const [tel, setTel] = useState(user.phone);
  const [profilePic, setProfilePic] = useState("");
  const [presentAddress, setPresentAddress] = useState(user.presentaddress);
  const [city, setCity] = useState(user.city);
  const [country, setCountry] = useState(user.country);
  const [preview, setPreview] = useState(user.profilePic);

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

  // Date formatting function
  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleUpdate = () => {
    // Use the formatDate function to format the date
    const formattedDate = dob.endDate ? formatDate(dob.endDate) : "";

    console.log("Formatted Date:", formattedDate);

    // Prepare updated user data
    const updatedUser = {
      name: Name,
      email: Email,
      phone: tel,
      presentaddress: presentAddress,
      city: city,
      country: country,
      dateOfBirth: formattedDate,
    };

    console.log("Updated User Data: ", updatedUser);

    if (profilePic) {
      dispatch(
        handleUpdateUser({ updatedData: updatedUser, profilePic: profilePic })
      );
    } else {
      dispatch(handleUpdateUser({ updatedData: updatedUser }));
    }
  };

  return (
    <div className="Profile ">
      <div className="wrapper bg-white rounded-xl p-4 m-2">
        <div className="flex flex-col">
          <div className="avatar  my-2 relative ">
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
        <div className="flex gap-4">
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full"
            onSubmit={handleUpdate}
          >
            <div className="flex flex-col my-2 md:col-span-2">
              <UiInput
                type="text"
                id="name"
                label={t("Your Name")}
                value={Name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
              />
            </div>
            <div className="flex flex-col my-2 md:col-span-2">
              <UiInput
                type="email"
                id="email"
                value={Email}
                disabled
                label={t("Email")}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
              />
            </div>
            <div className="flex flex-col my-2">
              <UiInput
                type="text"
                label={t("role")}
                id="clientType"
                value={role}
                disabled
                placeholder={role}
              />
            </div>
            <div className="flex flex-col my-2">
              <UiInput
                type="tel"
                id="phoneNumber"
                label={t("PhoneNumber")}
                value={tel}
                onChange={(e) => setTel(e.target.value)}
                placeholder="+0753235789"
              />
            </div>
            <div className="flex flex-col my-2">
              <label
                htmlFor="dob"
                className="text-sm font-medium text-gray-700 flex justify-start"
              >
                {t("dob")}
              </label>
              <Datepicker
                useRange={false}
                asSingle={true}
                value={dob}
                placeholder={user.dateOfBirth}
                primaryColor={"purple"}
                popoverDirection="up"
                toggleClassName="text-yellow absolute top-3 ltr:right-4 rtl:left-4"
                inputClassName="Input_UI p-2 border border-gray-300 rounded-xl w-full"
                onChange={(e) => setDob(e)}
              />
            </div>
            <div className="flex flex-col my-2">
              <UiInput
                type="text"
                id="address"
                label={t("Address")}
                value={presentAddress}
                onChange={(e) => setPresentAddress(e.target.value)}
                placeholder="San Jose, California, USA"
              />
            </div>
            <div className="flex flex-col my-2">
              <UiInput
                type="text"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                label={t("City")}
                placeholder="City"
              />
            </div>
            <div className="flex flex-col my-2">
              <UiInput
                type="text"
                label={t("Country")}
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Country"
              />
            </div>
            <Alert
              icon={<TfiLock className="w-5 h-5 text-gray-600" />}
              msg={
                "We keep your data private and never share it with third-parties.  "
              }
              msg_class={"msg_profile"}
              icon_class={"icon_profile"}
              customClass={"alert_profile col-span-2"}
            />
          </form>
        </div>
        {/* <div className="btn flex items-center justify-center md:justify-end my-3">
          <Button onClick={handleUpdate}>{t("save")}</Button>
        </div> */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: "none" }}
          id="fileInput"
        />
      </div>
    </div>
  );
};

export default Profile;
