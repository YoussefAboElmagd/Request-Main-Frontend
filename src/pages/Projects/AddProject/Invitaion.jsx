import { t } from "i18next";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Invitation = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          try {
            const data = await getAllData();
            setData(data.results);
          } catch (error) {
            console.error("Error fetching data:", error);
          } finally {
            setLoading(false);
          }
        };
        fetchData();
      }, []);

  return (
    <div className="Invitation flex justify-center  items-center text-center  effect h-screen overflow-hidden">
      <div className="wrapper flex flex-col gap-4 ">
        <h3 className="font-inter font-bold text-2xl md:text-3xl lg:text-5xl leading-[50px]  text-purple-dark text-center">
          Welcome Ahmed to Request !
        </h3>
        <p className="font-inter font-medium text-base md:text-lg lg:text-xl leading-8 ] text-center lg:mt-4 text-gray-600">
          You have been invited to 
          <span className="font-bold"> project name</span> <br /> as a
          <span className="font-bold"> Owner</span>
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-10 my-14">
          <button
            className={`p-6 lg:p-10  w-[280px] lg:w-[354px] rounded-3xl bg-linear_1   text-white font-bold text-3xl `}
          >
            Accept
          </button>
          <button
            className={`p-6 lg:p-10 w-[280px] lg:w-[354px] border border-red border-solid text-red rounded-3xl font-bold text-3xl `}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invitation;
