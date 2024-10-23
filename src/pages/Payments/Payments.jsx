import { IoInformationCircleOutline } from "react-icons/io5";
import Button from "../../Components/UI/Button/Button";
import StatusHeader from "../../Components/StatusHeader/StatusHeader";
import mastercardLogo from "../../assets/images/MasterCard.png";
import { useState } from "react";
import { MdOutlineMoreHoriz } from "react-icons/md";
import Input from "../../Components/UI/Input/Input";
import "./style.scss";

const Payments = () => {
  const [selectedTab, setSelectedTab] = useState("card");
  const [defaultCard, setDefaultCard] = useState(true);

  const handleTabClick = (tab) => setSelectedTab(tab);

  return (
    <div className="Payments bg-white p-2 m-2 rounded-3xl">
      <div className="header p-2">
        <h3 className="font-semibold text-base">Payment methods</h3>
        <p
          className="text-xs font-normal"
          style={{
            color: "#637381",
          }}
        >
          Please go ahead and enter your preferred payment method below. You can
          use a credit/debit card or prepay through Google pay, apple pay.
        </p>
      </div>
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
      <hr className="bg-gray my-4" />
      <div className="flex gap-4 mb-6 mt-5">
        {["card", "google", "apple"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded font-bold text-sm ${
              selectedTab === tab
                ? "text-purple-dark border-b-2 border-purple-dark"
                : "text-gray"
            }`}
            onClick={() => handleTabClick(tab)}
          >
            {tab === "card" && "Debit / Credit Card"}
            {tab === "google" && "Google Pay"}
            {tab === "apple" && "Apple Pay"}
          </button>
        ))}
      </div>

      {selectedTab === "card" && (
        <div className="card p-4">
          <h4 className="font-medium text-base">Credit or debit cards</h4>
          <p className="text-xs font-normal" style={{ color: "#637381" }}>
            The card will be charged monthly for resources used. All major
            credit/debit cards are accepted.
          </p>

          {/* Existing Cards Section */}
          <div className="bg-white border border-gray rounded-2xl p-6 mt-4 mb-8">
            {[{ expired: false }, { expired: true }].map((card, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b pb-4"
              >
                <div className="flex items-center gap-4">
                  <img src={mastercardLogo} alt="MasterCard" className="w-12" />
                  <div>
                    <p className="font-bold">
                      Ahmed Hassan{" "}
                      <span style={{ color: "#637381" }}>xxxx-1234</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Expires 10/202{index + 4} • Updated on 12 Jan 2021
                    </p>
                  </div>
                </div>
                <span
                  className={`${
                    card.expired ? "bg-red" : "bg-purple-dark"
                  } text-white text-xs px-2 py-1 rounded`}
                >
                  {card.expired ? "Expired" : "Default"}
                </span>
                <MdOutlineMoreHoriz className="text-gray-500 cursor-pointer" />
              </div>
            ))}
          </div>
          <div className="AddNewCard flex items-center justify-between">
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="font-bold mb-4">Add new card</h3>
              <div className="visa-card mb-4">
                <div className="logoContainer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="23"
                    height="23"
                    viewBox="0 0 48 48"
                    className="svgLogo"
                  >
                    <path
                      fill="#ff9800"
                      d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z" 
                    />
                    <path
                      fill="#d50000"
                      d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z"
                    />
                    <path
                      fill="#ff3d00"
                      d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z"
                    />
                  </svg>
                </div>
                <div className="number-container">
                  <label className="input-label" htmlFor="cardNumber">
                    CARD NUMBER
                  </label>
                  <input
                    className="inputstyle"
                    id="cardNumber"
                    placeholder="XXXX XXXX XXXX XXXX"
                    inputmode="numeric"
                    pattern="[0-9\s]{13,19}"
                    autocomplete="cc-number"
                    maxlength="19"
                    name="cardNumber"
                    type="text"
                  />
                </div>

                <div className="name-date-cvv-container">
                  <div className="name-wrapper">
                    <label className="input-label" htmlFor="holderName">
                      CARD HOLDER
                    </label>
                    <input
                      className="inputstyle"
                      id="holderName"
                      placeholder="NAME"
                      type="text"
                    />
                  </div>

                  <div className="expiry-wrapper">
                    <label className="input-label" htmlFor="expiry">
                      VALID THRU
                    </label>
                    <input
                      className="inputstyle"
                      id="expiry"
                      placeholder="MM/YY"
                      maxlength="5"
                      type="text"
                    />
                  </div>
                  <div className="cvv-wrapper">
                    <label className="input-label" htmlFor="cvv">
                      CVV
                    </label>
                    <input
                      className="inputstyle"
                      placeholder="***"
                      maxLength={3}
                      id="cvv"
                      type="password"
                    />
                  </div>
                </div>
              </div>

              <form className="grid grid-cols-2 gap-6">
                <div>
                  <Input
                    label={"Card Number"}
                    placeholder={"Card Number"}
                    type={""}
                    className="bg-white border border-gray border-solid focus:border-gray focus:border focus:border-solid"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Card Number
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    placeholder="Card Number"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">
                    CVV Code
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    placeholder="CVV"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    placeholder="Name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium">
                      Month
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      placeholder="Month"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium">
                      Year
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      placeholder="Year"
                    />
                  </div>
                </div>

                <div className="col-span-2">
                  <label className="flex items-center gap-2 font-medium text-base select-none">
                    <input type="checkbox" className="h-4 w-4" />
                    <span>Make this my default payment method</span>
                  </label>
                </div>

                <Button type="submit" className="col-span-2 text-center">
                  Confirm and pay
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
      {selectedTab === "apple" && <span>apple</span>}
      {selectedTab === "google" && <span>google</span>}
    </div>
  );
};

export default Payments;
