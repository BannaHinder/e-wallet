import { Link } from "react-router-dom";
import NewCard from "../components/NewCard";

const AddCard = () => {
  return (
    <>
    <header><h1>addcard</h1></header>
      <NewCard />
      <footer><nav>
        <Link to="/cards">Back</Link>
      </nav></footer>
    </>
  );
};

export default AddCard;
