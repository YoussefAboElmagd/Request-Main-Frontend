import { t } from "i18next";
import ContactUsImage from "../../assets/images/ContactUs.svg";
import Button from "../../Components/UI/Button/Button";
import { Link } from "react-router-dom";
import UiInput from "../../Components/UI/Input/UIInput";
import { useState } from "react";
import { useSelector } from "react-redux";

const ContactUs = () => {
  const user = useSelector((state) => state.auth.user);
  const [Name, setName] = useState(user.name);
  const [Email, setEmail] = useState(user.email);
  const [Message, setMessage] = useState("");

  return (
    <div className="ContactUs ">
      <div className="msg shadow-md bg-white flex items-center justify-between rounded-2xl ">
        <div className="content flex flex-col p-4">
          <h6
            className="font-normal text-xl leading-5 my-1"
            style={{ color: "#7E7E7E" }}
          >
            {t("Contact us")}
          </h6>
          <h5 className="font-semibold text-2xl text-purple my-1">
            {t("We are waiting for you")}
          </h5>
          <p
            className="font-light text-sm leading-5 max-w-[620px] my-1"
            style={{ color: "#5E5E5E" }}
          >
            {t(
              "Do not hesitate to leave us a message about your problem or suggestion, and the support team will reply to you."
            )}
          </p>
          <Link to={"/"}>
            <Button className={"w-fit mt-2"}>{t("Contact us")}</Button>
          </Link>
        </div>
        <div className="image">
          <img src={ContactUsImage} alt="Contact Us" width={250} height={50} />
        </div>
      </div>
      <form action="submit" className="form bg-white rounded-3xl  p-4  mt-10">
        <div className="Name my-2">
          <UiInput
            type="text"
            id="name"
            label={t("yourName")}
            value={Name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            className="border border-solid  border-purple focus:border focus:border-solid  focus:border-purple"
          />
        </div>
        <div className="Email my-2">
          <UiInput
            type="text"
            id="Email"
            label={t("Email")}
            value={Email}
            onChange={(e) => setName(e.target.value)}
            placeholder="name@email.com"
            className="border border-solid  border-purple focus:border focus:border-solid  focus:border-purple"
          />
        </div>
        <div className="message">
          <label
            htmlFor="message"
            className="flex items-center gap-2 font-jost text-base font-medium "
          >
            {t("message")}
          </label>
          <textarea
            name="message"
            id="message"
            placeholder={t("type here")}
            required={true}
            value={Message}
            onChange={(e) => setMessage(e.target.value)}
            className={`   bg-white  w-full   rounded-xl border border-purple font-jost font-normal text-base  my-2 py-2 px-4  border-solid  focus:border   focus:border-purple  focus:border-solid`}
          />
        </div>
        <div className="flex items-center justify-end gap-2 m-2">
          <Button>{t("save")}</Button>
        </div>
      </form>
    </div>
  );
};

export default ContactUs;
