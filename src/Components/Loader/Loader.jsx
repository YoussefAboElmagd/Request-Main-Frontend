/* eslint-disable react/prop-types */
import Lottie from "lottie-react";
import LoadingData from "../../assets/images/loading.json";

const Loader = ({ className }) => {
  return (
    <Lottie animationData={LoadingData} className={` ${className} w-52`} />
  );
};

export default Loader;
