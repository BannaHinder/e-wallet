import {activateCard, deleteCard} from './cardsSlice'
import {useDispatch } from "react-redux";
import { useEffect } from "react";
import goldChip from '../img/goldChip.png'

const Card = ({card}) => {

 const dispatch = useDispatch()

  const fireActivateCard = ()=>{
    dispatch(activateCard(card.id))
  }
  const fireDeleteCard = ()=>{
    dispatch(deleteCard(card.id))
  }

let isActive= '';
  if(card.active){isActive="active"}



  return (
    <>
    <section className={'card' +' '+ card.vendor + ' ' + isActive} onClick={()=>{fireActivateCard()}} >
      
      <p>{card.cardNumber}</p>
      <div>
      <img src={goldChip} alt="" height={'45px'} />
        {/* <img src="" alt="" />
        <img src="" alt="" /> */}
      </div>
      <div>
        <p>CARDHOLDER NAME</p>
        <p>VALID THRU</p>
      </div>
      <div>
        <p>{card.cardHolderName}</p>
        <p>{card.validThru }</p>
      </div>
    </section>
    {/* <button onClick={()=>{fireDeleteCard()}}>Delete</button> */}
    </>
  );
};

export default Card;
