import { activateCard, deleteCard } from "./cardsSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import goldChip from "../img/goldChip2.png";
import logo1 from "../img/ruptLogo.png"
import logo2 from "../img/handshake.png"
import logo3 from "../img/barbwire.png"

const Card = ({ card }) => {

  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  let logo;
  
  const showPopUp = () => {
    if (!card.active) {
      setShow(!show);
    }
  };

  const fireActivateCard = () => {
    dispatch(activateCard(card.id));
    setShow(!show);
  };

  const fireDeleteCard = () => {
    dispatch(deleteCard(card.id));
    setShow(!show);
  };

  let isActive = "";
  if (card.active) {
    isActive = "active";
  }

  let formattedNumber = card.cardNumber.match(/.{1,4}/g);
  formattedNumber = formattedNumber.join(" ");

  if(card.vendor==='ruptBank'){
logo= logo1;
  }else if(card.vendor==='comradeBank'){
logo= logo2;
  }else{
logo=logo3
  }

  return (
    <>
      <section
        className={"card" + " " + card.vendor + " " + isActive}
        onClick={() => {
          showPopUp();
        }}
      >
        <article className="img">
          <img src={goldChip} alt="bank-chip" height={"80px"} />
          <img src={logo} alt="logo" className="logo" height={"70px"}/>
        </article>
        <article >
          <h3>{formattedNumber}</h3>
          <div>
            <span>CARDHOLDER NAME</span>
            <span>VALID THRU</span>
          </div>
          <div>
            <p>{card.cardHolderName}</p>
            <p>{card.validThru}</p>
          </div>
        </article>
      </section>
      <aside className={show ? "" : "hide"}>
        <button
          onClick={() => {
            fireActivateCard();
          }}
        >
          Activate this card
        </button>
        <button
          onClick={() => {
            fireDeleteCard();
          }}
        >
          Delete
        </button>
      </aside>
    </>
  );
};

export default Card;
