import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPencilAlt } from "react-icons/fa";
import avatar from "../../assets/images/avatar.png";
import Button from "../../Components/UI/Button/Button";
import { format } from "date-fns";
import { t } from "i18next";
import { handleUpdateUser } from "../../redux/services/authServices";
import UiInput from "../../Components/UI/Input/UIInput";
import Datepicker from "react-tailwindcss-datepicker";

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

  const handleUpdate = () => {
    // Format the date to yyyy-mm-dd
    const formattedDate = dob.endDate
      ? new Date(dob.endDate).toISOString()
      : "";

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
      <h1 className="title font-inter font-bold text-3xl text-black m-2">
        {t("Profile")}
      </h1>
      <div className="wrapper bg-white rounded-xl p-4 m-2">
        <div className="flex gap-4">
          <div className="flex flex-col">
            <h6 className="sub_title font-inter font-medium text-base underline underline-offset-8 p-4">
              {t("EditProfile")}
            </h6>
            <div className="avatar mx-4 my-2 relative">
              <img
                src={preview}
                alt="avatar"
                className="rounded-xl bg-red-200 w-24 h-24 object-contain"
              />
              <button
                onClick={() => document.getElementById("fileInput").click()}
                className="bg-purple-500 absolute w-8 h-8 rounded-full flex items-center justify-center -right-2 -bottom-1 cursor-pointer"
              >
                <FaPencilAlt className="text-white" />
              </button>
            </div>
          </div>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div className="flex flex-col my-2 md:col-span-2">
              <UiInput
                type="text"
                id="name"
                label={t("UserName")}
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
                className="text-sm font-medium text-gray-700"
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
                toggleClassName="text-yellow absolute top-3 right-4"
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
          </form>
        </div>
        <div className="btn flex items-center justify-center md:justify-end my-3">
          <Button onClick={handleUpdate}>{t("save")}</Button>
        </div>
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
