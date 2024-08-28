import { Link } from "react-router-dom"
import Button from "../../Components/UI/Button/Button";

const Home = () => {
  return (
    <>
      <Button>
        <Link to="/SignUp/ChooseRole">Sign Up</Link>
      </Button>
    </>
  );
}

export default Home