import { Link } from "react-router-dom";

const AuthHeader = () => {
  return (
    <div className="top-0 bg-white flex items-center justify-end m-3">
      <Link to={"/LogIn"}>
        <button className="py-2 px-14 bg-linear_1 rounded-3xl text-white m-2 font-bold text-xl">
          sign in
        </button>
      </Link>
      <Link to="/SignUp">
        <button className="py-2 px-14  bg-white border border-purple border-solid rounded-3xl text-purple m-2 font-bold text-xl">
          Register
        </button>
      </Link>
    </div>
  );
}
  
export default AuthHeader