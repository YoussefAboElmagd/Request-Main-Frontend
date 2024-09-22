import React from "react";
import { useSelector } from "react-redux";
import { CheckInput } from "../setting";

const Security = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="Security">
      <div className="email flex items-center  justify-between   m-2 mb-4 ">
        <p>Sign-in Email</p>
        <span>{user.email}</span>
      </div>
      <div className="changePassword flex items-center  justify-between   m-2 mt-8">
        <p>Password</p>
        <button className="btn  text-gold">Change Password</button>
      </div>
      <div className="divider h-px w-full bg-gray my-2"></div>
      <div className="twoFactor flex items-center  justify-between   mx-2 mt-4 mb-8">
        <p>2-FA autentification</p>
        <CheckInput />
      </div>
      <div className="Phone flex items-center  justify-between   mx-2 mt-8 mb-2">
        <p>Phone number</p>
        <span>{user.phone}</span>
      </div>
      <div className="divider h-px w-full bg-gray my-2"></div>
      <div className="LastSignIn mx-2 mt-4 mb-8">
        <p>Last Sign-in</p>
        <span>{user.updatedAt}</span>
      </div>
    </div>
  );
};

export default Security;
