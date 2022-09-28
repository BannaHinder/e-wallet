import { Link } from "react-router-dom";
import NewCard from "../components/NewCard";

const AddCard = () => {
  return (
    <>
      <h1>addcard</h1>
      <NewCard />
      <nav>
        <Link to="/cards">Back</Link>
      </nav>
    </>
  );
};

export default AddCard;
