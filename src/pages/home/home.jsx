import { Link } from "react-router-dom"

const Home = () => {
  return (
      <Link to={"/LogIn"} className="text-red">
        Log In By Phone
      </Link>
    
  );
}

export default Home