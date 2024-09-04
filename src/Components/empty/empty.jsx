import React from 'react'
import { FaFileExcel } from 'react-icons/fa';

const Empty = () => {
  return (
    <div className="Empty box bg-white flex justify-center items-center rounded-3xl w-[407px] h-[236px] flex-col    ">
      <span>
        <FaFileExcel className="text-purple-dark w-8 h-8" />
      </span>
        <p className="text-2xl font-inter font-semibold text-purple mt-2 leading-9 text-center ">
          You're just steps away from your screens
        </p>
    </div>
  );
}

export default Empty