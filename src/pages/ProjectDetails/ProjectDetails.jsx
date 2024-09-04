import { t } from "i18next";
import React from "react";

const ProjectDetails = () => {
  return (
    <div className="ProjectDetails mx-1">
      <h1 className="title font-inter font-bold text-3xl text-black m-2">
        {t("Project details")}
      </h1>
      <div className="boxes flex items-center justify-between gap-2 m-2 ">
        <div className="desc max-w-[341px]">
          <p className="font-inter font-bold text-base leading-5 m-2">
            Description
          </p>
          <div className="desc_content bg-purple text-white py-9 px-6 rounded-3xl ">
            <p className="font-inter font-normal text-sm leading-6  ">
              Details about the project that the user wants to tell to both the
              contractor and the consultant
            </p>
          </div>
        </div>
        <div className="fullBudget grid grid-cols-2    bg-white  p-6 rounded-3xl">
          <p
            className="font-inter font-bold text-2xl  top-0 left-0 col-span-1"
            style={{ color: "#81D4C2" }}
          >
            Full budget
          </p>
          <span className="font-inter font-bold text-xl bottom-0 right-0 col-span-1">
            50000
          </span>
        </div>
        <div className="Remaining max-w-[341px]  bg-white  p-6 rounded-3xl">
          <div className="desc bg-white  p-2 rounded-3xl">
            <p className="font-inter font-bold text-2xl text-purple">
              Remaining
            </p>
            <span className="font-inter font-bold text-xl">500</span>
          </div>
        </div>
      </div>
      <div className="wrapper bg-white grid grid-cols-2 ">
        <div className="box">

        </div>
        <div className="form">
            
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
