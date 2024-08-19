import { Link } from "react-router-dom";
import Button from "../../../Components/UI/Button/Button";
import SignUpImg from "../../../assets/images/SignUp.png";
import Input from "../../../Components/UI/Input/Input";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AuthHeader from "../../../Components/authHeader/AuthHeader";
import Google from "../../../assets/images/Google.png"
import Apple from "../../../assets/images/Apple.png"
import Facebook from "../../../assets/images/Facebook.png"
import "./style.scss"

const SignUp = () => {
  return (
    <div className="LogIn h-screen relative">
      <AuthHeader />
      <div className="Wrapper flex items-center justify-between">
        <div className="w-96 my-40 ">
          <h3 className="font-workSans  font-bold text-5xl">
            sign Up To activate your business easily
          </h3>
          <p className="font-jost  font-medium text-2xl">
            if you do have an account you can{" "}
            <Link className="text-blue" to="/LogIn">
              sign in here!
            </Link>
          </p>
        </div>
        <div className=" LogIn_Image  flex justify-center -z-10">
          <img
            src={SignUpImg}
            className="mb-10"
            alt="image"
            width={523}
            height={430}
            loading="lazy"
          />
        </div>
        <div className="form flex flex-col ">
          <Input
            placeholder={"Your name"}
            type={"text"}
            id={"name"}
            autoFocus={true}
            autoComplete="name"
            required={true}
            name={"name"}
          />
          <Input
            placeholder={"Enter Email"}
            type={"email"}
            id={"email"}
            autoComplete="email"
            required={true}
            name={"email"}
          />
          <Input
            type="tel"
            id="tel"
            pattern="\+9665[0-9]{8}"
            autoFocus={true}
            autoComplete="tel"
            placeholder={"Phone number"}
            required
          />
          <Input
            placeholder="Enter Password"
            type="password"
            id="password"
            autoComplete="password"
            required
            name="password"
            minLength={8}
            icons={[
              {
                element: <FaEyeSlash />,
                type: "visibility",
              },
              {
                element: <FaEye />,
                type: "visibility",
              },
            ]}
          />
          <Input
            placeholder="Confirm Password"
            type="password"
            id="password"
            autoComplete="password"
            required
            name="password"
            minLength={8}
            icons={[
              {
                element: <FaEyeSlash />,
                type: "visibility",
              },
              {
                element: <FaEye />,
                type: "visibility",
              },
            ]}
          />

          <Button className={"mt-5"}>Register</Button>
          <hr className="my-4" />
          <div className="flex items-center  justify-between mt-4 gap-4">
            <div className="box_Google">
              <img src={Google} alt="Google" width={23} height={28} />
            </div>
            <div className="box_Apple ">
              <img src={Apple} alt="Apple" width={23} height={28} />
            </div>
            <div className="box_Facebook ">
              <img src={Facebook} alt="Facebook" width={23} height={28} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
