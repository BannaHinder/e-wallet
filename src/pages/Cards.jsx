import { Link } from "react-router-dom";
import Card from "../components/Card";
import { useSelector, useDispatch } from "react-redux";
import { useEffect} from 'react'
import {initializeCard} from '../components/cardsSlice'


const Cards = () => {
   const { cards } = useSelector((state) => state.cards);
   const { user } = useSelector((state) => state.user);
 
  console.log(user);

  return (
    <>
    <header><h1>Your Wallet:</h1></header>
      <main>
        <h2>Active Card</h2>
        <div>
        {cards &&
          cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
          </div>
      </main>
          <footer><nav>
        <Link to="/addcard">Add new card</Link>
      </nav></footer>
    </>
  );
};

export default Cards;
