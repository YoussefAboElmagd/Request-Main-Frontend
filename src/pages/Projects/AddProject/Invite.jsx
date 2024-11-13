import { t } from "i18next";
import Input from "../../../Components/UI/Input/Input";
import Select from "../../../Components/UI/Select/Select";
import { CiSquarePlus, CiSquareRemove } from "react-icons/ci";
import Button from "../../../Components/UI/Button/Button";
import { useState } from "react";

const Invite = () => {
  const [invites, setInvites] = useState([{ email: "", type: "" }]);

  const roles = [
    { _id: "66d33a4b4ad80e468f231f83", name: "owner", label: t("owner") },
    {
      _id: "66d33ec44ad80e468f231f91",
      name: "contractor",
      label: t("contractor"),
    },
    {
      _id: "66d33e7a4ad80e468f231f8d",
      name: "consultant",
      label: t("consultant"),
    },
  ];
  // Function to add a new invite with default email and type
  const addNewInvite = () => {
    const newInvite = { email: "", type: "" };
    setInvites((prevInvites) => [...prevInvites, newInvite]);
  };

  // Function to handle email and type changes for each invite
  const handleInviteChange = (index, field, value) => {
    const updatedInvites = invites.map((invite, i) =>
      i === index ? { ...invite, [field]: value } : invite
    );
    setInvites(updatedInvites);
  };

  // Function to remove an invite by index
  const removeInvite = (index) => {
    setInvites(invites.filter((_, i) => i !== index));
  };

  return (
    <div className="Invite mx-1">
      <h1 className="title font-inter font-bold text-3xl text-black m-2 rtl:hidden">
        {t("invite")}
      </h1>
      <div className="wrapper bg-white rounded-3xl p-3 m-2">
        <form className="">
          {invites.map((invite, index) => (
            <div
              key={index}
              className="invite-item  grid grid-cols-3 lg:grid-cols-6 gap-3 mb-2"
            >
              <div className="col-span-3">
                <Input
                  className="bg-white border border-purple border-solid focus:border-purple focus:border focus:border-solid"
                  label={t("invite")}
                  placeholder={t("Email")}
                  type={"email"}
                  required
                  value={invite.email}
                  onChange={(e) =>
                    handleInviteChange(index, "email", e.target.value)
                  }
                />
              </div>
              <div className="col-span-2">
                <Select
                  label={t("type")}
                  options={roles.map((role) => ({
                    label: role.label,
                    value: role._id,
                  }))}
                  placeholder={t("role")}
                  value={invite.type}
                  onChange={(value) => handleInviteChange(index, "type", value)}
                />
              </div>
              <div className="col-span-1 flex items-center gap-2 mt-3">
                {index === 0 && (
                  <button type="button" onClick={addNewInvite}>
                    <CiSquarePlus className="w-10 h-10 bg-yellow text-white rounded-lg" />
                  </button>
                )}
                {index > 0 && (
                  <button type="button" onClick={() => removeInvite(index)}>
                    <CiSquareRemove className="w-10 h-10 text-red" />
                  </button>
                )}
              </div>
            </div>
          ))}
          <div className="col-span-6 flex justify-end mt-4">
            <Button>{t("invite")}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Invite;
