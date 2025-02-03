import React from 'react';
import logo from "../../assets/images/Mask_group.png";


const Footer = () => {
  return (
    <footer className="flex rounded-t-lg opacity-80 justify-center items-center bg-gray-600 text-white p-4">
      <img src={logo} alt="Logo" className="h-6 mr-2" />
      <span><a href="https://mdarj.org/" className="hover:underline">Powered By Mdarj</a></span>
    </footer>
  );
};

export default Footer;