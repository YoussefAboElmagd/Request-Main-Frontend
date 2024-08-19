import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className="flex items-center justify-center bg-linear_1 text-light font-medium text-3xl">
      <Link to={"/LogIn"} className="text-white">
      Log In By Phone 
      </Link>
    </div>
  )
}

export default Home