import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addCard } from "./cardsSlice";
import goldChip from '../img/goldChip2.png'
import { useState } from "react";
// import validator from 'validator' I DONT'T NEED YOU U STUPID
import logo1 from "../img/ruptLogo.png"
import logo2 from "../img/handshake.png"
import logo3 from "../img/barbwire.png"

const NewCard = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { latestId } = useSelector((state) => state.cards);
  const [errorMessage, setErrorMessage] = useState('');
  const [isValid, setIsValid] = useState(false)

  let logo=null;
    
 const validator = (str)=>{
  const creditCardPattern = /^(?:4[0-9]{15}(?:[0-9]{3,6})?|5[1-5][0-9]{14}|(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|6(?:011|5[0-9][0-9])[0-9]{12,15}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11}|6[27][0-9]{14}|^(81[0-9]{14,17}))$/;
  if (str==='')
  {
     return false;
  }
  if(!str.length===16){
    return false;
  }
  if(creditCardPattern.test(str)){
    console.log('matched!!!')
    return true
  }
}
  const validateCreditCard = (value) => {
    if(value.length>4){
    let joy =value.match(/.{1,4}/g);
    document.getElementById("inputCardNumber").value = joy.join(' ')

}else{
  document.getElementById("inputCardNumber").value = value
}
if (validator(value)) {
      setErrorMessage('Valid CreditCard Number');
      setIsValid(true)
    } else {
      setErrorMessage('Enter valid CreditCard Number!')
      setIsValid(false)
    }
  }

  const handleSubmit = (e) => {
     e.preventDefault();
     if(isValid){
    let formData = new FormData(e.target);
    let formProps = Object.fromEntries(formData);
    //CHECKING CCV FORMAT
      const ccvPattern = /^[0-9]{3}$/
      if(!ccvPattern.test(formProps.ccv)){
        console.log('Not a valid ccv')
        return
      }
   //CHECKING VALIDITY
    const today = new Date()
    const formattedToday = today.getFullYear().toString() + '-' + (today.getMonth()+1).toString() //JÄVLA PISS GREJ VARFÖR RETURNERAS MÅNAD MED 0-BAS???? SHIT VAD LÅNG TID ET TOG O HITTA FELET
      let minimumDate = new Date(formattedToday + '-01')
      let inputDate = new Date(formProps.validThru + '-01')
      if(minimumDate.getTime()>inputDate.getTime()){
        console.log('the card is expired')
        return
      }
    const formattedValidity= formProps.validThru.replace("20", "/").split("-").reverse().join("");
    formProps.validThru= formattedValidity
    formProps.active = false;
    formProps.id = latestId;
    console.log(formProps);
    dispatch(addCard(formProps));
    document.getElementById("newCardForm").reset();}
  };

  const inputChange = () => {
    
    document.getElementById("inputDate").value = document
      .getElementById("validThru")
      .value.replace("20", "/")
      .split("-")
      .reverse()
      .join("");
  };
  const updateVendor = (e)=>{
    document.getElementById('card').classList.remove('ruptBank', 'comradeBank', 'notYourBank')
    document.getElementById('card').classList.add(e.target.value) 
    if(e.target.value==='ruptBank'){
      logo= logo1;
        }else if(e.target.value==='comradeBank'){
      logo= logo2;
        }else{
      logo=logo3
        }
        console.log(logo)
  }






  return (
    <main>
      <section className={"card"} id={"card"}>
      <article className="img">
          <img src={goldChip} alt="bank-chip" height={"80px"} />
          {logo && (<img src={logo} alt="logo" className="logo" height={"70px"}/>)}
        </article>
        <article>
         <input type="text" id="inputCardNumber"   placeholder="xxxx xxxx xxxx xxxx" readOnly  />
        <div>
          <span>CARDHOLDER NAME</span>
          <span>VALID THRU</span>
        </div>
        <div>
          <p>{user}</p>
          <input type="text" id="inputDate" placeholder="00/00" readOnly />
        </div>
        </article>
      </section>


      <form onSubmit={handleSubmit} id="newCardForm" >
        <label htmlFor="cardNumber">Card Number:</label>
        <input type="text"  name="cardNumber" id="cardNumber"  placeholder="XXXX XXXX XXXX XXXX" required
        maxLength={16}
        onChange={(e) => validateCreditCard(e.target.value)}></input> 
      
        <span style={ isValid?{  color: 'green' }:{color: 'red'}}>{errorMessage}</span>

        <label htmlFor="cardHolderName">Cardholder Name:</label>
        <input
          type="text"
          name="cardHolderName"
          id="cardHolderName"
          value={user}
          readOnly
        />
        <div className="validity-ccv">
          <div>
          <label htmlFor="validThru">Valid thru:</label>
          <input type="month" name="validThru" id="validThru"  onChange={() => {
              inputChange();
            }}
            required
          />
          </div>
          <div>
          <label htmlFor="ccv">CCV:</label>
          <input
            type="text"
            name="ccv"
            id="ccv"
            maxLength={3}
            placeholder="000"
            required
          />
          </div>
        </div>
      
        <label htmlFor="vendor">Vendor:</label>
        <select name="vendor" id="vendor" required  onChange={(e) => {updateVendor(e);}} >
          <option value="" selected disabled>Choose Vendor</option>
          <option value="notYourBank">Not Your Bank</option>
          <option value="comradeBank">Comrade Bank</option>
          <option value="ruptBank">Bank of Rupt</option>
          
        </select>
      
        <input type="submit" value="Submit" />
      </form>
    </main>
  );
};

export default NewCard;