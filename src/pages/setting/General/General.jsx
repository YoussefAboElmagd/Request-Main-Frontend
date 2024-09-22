import { MdOutlineLanguage } from "react-icons/md";
import "./style.scss";
import Button from "../../../Components/UI/Button/Button";
import ContactUs from "../../../assets/images/ContactUs.svg";
import { Link } from "react-router-dom";

//  check input

function CheckInput({}) {
  return (
    <div className="toggle">
      <label className="label">
        <input
          className="toggle-state"
          type="checkbox"
          name="check"
          value="check"
        />
        <div className="toggle">
          <div className="indicator"></div>
        </div>
      </label>
    </div>
  );
}

function Wrapper({ head, paragraph }) {
  return (
    <div className="flex items-center  justify-between  my-3">
      <div className="flex flex-col mx-2">
        <h6 className="font-medium text-base leading-5">{head}</h6>
        <p
          className=" font-normal text-sm leading-5"
          style={{
            color: "#9095A1",
          }}
        >
          {paragraph}
        </p>
      </div>
      <div className="toggle">
        <CheckInput />
      </div>
    </div>
  );
}

const General = () => {
  return (
    <div className="General ">
      <div className="lang flex items-center  justify-between my-3">
        <div className="flex items-center">
          <span
            className=" p-2  rounded-md mx-1 "
            style={{
              boxShadow: "0px 0px 1px 0px #0000000A",
              background: "#CCABDA08 ",
            }}
          >
            <MdOutlineLanguage
              className="w-5  h-5"
              style={{
                color: "#CCABDA",
              }}
            />
          </span>
          <span className=" font-semibold  text-base">English / Arabic</span>
        </div>
        <div className="toggle">
          <CheckInput />
        </div>
      </div>
      <div className="Offers">
        <Wrapper
          head={"Offers and packages"}
          paragraph={"Sending all new offers and packages via email"}
        />
      </div>
      <div className="notifications">
        <Wrapper
          head={"Notifications"}
          paragraph={"Sending a new notification to the registered email"}
        />
      </div>
      <div className="renew">
        <Wrapper
          head={"Renewal of the subscription"}
          paragraph={
            "Notifications before the monthly balance expires and the payment due date approaches."
          }
        />
      </div>

      <div className="msg shadow-md flex items-center  justify-between  rounded-2xl mt-10 ">
        <div className="content flex flex-col p-4">
          <h6
            className="font-normal text-xl leading-5 my-1 "
            style={{
              color: "#7E7E7E",
            }}
          >
            Contact us
          </h6>
          <h5 className="font-semibold  text-2xl text-purple my-1">We are waiting for you</h5>
          <p
            className=" font-light text-sm leading-5 max-w-[620px] my-1"
            style={{ color: "#5E5E5E" }}
          >
            Do not hesitate to leave us a message about your problem or
            suggestion and the support team will reply to you{" "}
          </p>
          <Link to={"/"}>
          <Button className={"w-fit mt-2"}>Contact Us</Button>
          </Link>
        </div>
        <div className="image">
          <img src={ContactUs} alt="ContactUs" width={250} height={50} />
        </div>
      </div>
    </div>
  );
};

export default General;
