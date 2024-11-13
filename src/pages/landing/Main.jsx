import "./style.scss";
import landing1 from "../../assets/images/landing1.jpg";
import landing2 from "../../assets/images/landing2.jpg";
import landing3 from "../../assets/images/landing3.jpg";
import landing4 from "../../assets/images/1PlaceholderImages-2.svg";
import landing5 from "../../assets/images/1PlaceholderImages-1.svg";
import landing6 from "../../assets/images/1PlaceholderImages.svg";
import box1 from "../../assets/images/box1.png";
import box2 from "../../assets/images/box2.png";
import box3 from "../../assets/images/box3.png";
import { useEffect, useRef, useState } from "react";
import { t } from "i18next";
import { Link } from "react-router-dom";
const Main = () => {
  const [Mode, setMode] = useState("Mode1");
  
  const intervalRef = useRef(null);



  useEffect(() => {
    const modes = ["Mode1", "Mode2", "Mode3"];
    let currentIndex = 0; 

    intervalRef.current = setInterval(() => {
      currentIndex = (currentIndex + 1) % modes.length;
      setMode(modes[currentIndex]);
    }, 4000);

    return () => clearInterval(intervalRef.current);
  }, []);
  const handleMouseEnter = (mode) => {
    setMode(mode);
    clearInterval(intervalRef.current);
  };
   const handleMouseLeave = () => {
     // Restart the interval on mouse leave
     const modes = ["Mode1", "Mode2", "Mode3"];
     let currentIndex = modes.indexOf(Mode);
     intervalRef.current = setInterval(() => {
       currentIndex = (currentIndex + 1) % modes.length;
       setMode(modes[currentIndex]);
     }, 4000);
   };
  return (
    <div className="Main relative h-[90vh] overflow-hidden   ">
      <div className="absolute top-16 right-16">
        <span className="halfCircleEffect"></span>
      </div>
      <div className="absolute bottom-0 left-16">
        <span className="halfCircleLineEffect"></span>
      </div>
      <div className="flex items-center ltr:justify-start rtl:justify-end h-[80vh]">
        <div className="box bg-linear_1 text-white p-2 m-2 mx-6 rounded-xl max-w-[500px]">
          <h2 className="text-2xl font-extrabold">
            {Mode === "Mode1"
              ? t("landingMessage.message1")
              : Mode === "Mode2"
              ? t("landingMessage.message2")
              : Mode === "Mode3"
              ? t("landingMessage.message3")
              : ""}
          </h2>
          <p className="ltr:text-base rtl:text-lg  font-medium">
            {Mode === "Mode1"
              ? t("landingMessage.message4")
              : Mode === "Mode2"
              ? t("landingMessage.message5")
              : Mode === "Mode3"
              ? t("landingMessage.message6")
              : ""}{" "}
          </p>

          <Link to={"/landing/seePlans"}>
            <button className="py-2 px-4 bg-white text-purple rounded-lg my-2 transition-all">
              {t("landingMessage.Btn")}
            </button>
          </Link>
        </div>
      </div>
      <div className="landingImage1 absolute right-52 top-36 transition-all">
        <img
          src={
            Mode === "Mode1"
              ? landing6
              : Mode === "Mode2"
              ? landing5
              : Mode === "Mode3"
              ? landing4
              : ""
          }
          alt="Landing Main Image"
          width={450}
          height={450}
          // loading="lazy"
          className="transition-all"
        />
      </div>
      <div className="landingImage2 absolute -right-24 bottom-12 rotate-45  p-2 transition-all">
        <img
          src={
            Mode === "Mode1"
              ? landing3
              : Mode === "Mode2"
              ? landing1
              : Mode === "Mode3"
              ? landing2
              : ""
          }
          alt="Landing Main Image"
          width={200}
          height={200}
          className="rounded-xl shadow-md transition-all"
          // loading="lazy"
        />
      </div>
      <div className="landingImage3 absolute right-[500px] -top-28  rotate-45 -z-10  p-2 ">
        <img
          src={
            Mode === "Mode1"
              ? landing2
              : Mode === "Mode2"
              ? landing3
              : Mode === "Mode3"
              ? landing1
              : ""
          }
          alt="Landing Main Image"
          width={200}
          height={200}
          className="rounded-xl shadow-md transition-all"
          // loading="lazy"
        />
      </div>
      <div
        className={`box1 landing_box ${
          Mode === "Mode1" ? "active" : ""
        } bottom-28 left-32 transition-all`}
        onMouseEnter={() => handleMouseEnter("Mode1")}
        onMouseLeave={handleMouseLeave}
      >
        <img src={box1} alt="landing_box" loading="lazy" />
      </div>
      <div
        className={`box2 landing_box ${
          Mode === "Mode2" ? "active" : ""
        } bottom-24 left-96 transition-all`}
        onMouseEnter={() => handleMouseEnter("Mode2")}
        onMouseLeave={handleMouseLeave}
      >
        <img src={box2} alt="landing_box" loading="lazy" />
      </div>
      <div
        className={`box3 landing_box ${
          Mode === "Mode3" ? "active" : ""
        } bottom-10 left-[600px] transition-all`}
        onMouseEnter={() => handleMouseEnter("Mode3")}
        onMouseLeave={handleMouseLeave}
      >
        <img src={box3} alt="landing_box" loading="lazy" />
      </div>
    </div>
  );
};

export default Main;
