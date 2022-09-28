import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addCard } from "./cardsSlice";
import goldChip from '../img/goldChip.png'

const NewCard = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { cards, latestId } = useSelector((state) => state.cards);
  console.log(cards);

  const handleSubmit = (e) => {
     e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    //sätt in expiracy validation här, ändra formatet så länge
    formProps.validThru = formProps.validThru
    .replace("20", "/")
    .split("-")
    .reverse()
    .join("");
    formProps.active = false;
    formProps.id = latestId;
    console.log(formProps);
    dispatch(addCard(formProps));
  };

  let vendor ='';
  const inputChange = () => {
    document.getElementById("inputCardNumber").value =
      document.getElementById("cardNumber").value;
    document.getElementById("inputDate").value = document
      .getElementById("validThru")
      .value.replace("20", "/")
      .split("-")
      .reverse()
      .join("");
  };
  const updateVendor = ()=>{
    document.getElementById('card').classList.remove('ruptBank', 'comradeBank', 'notYourBank')
    document.getElementById('card').classList.add(document.getElementById('vendor').value) 
    console.log(vendor)
  }

  return (
    <main>
      <section className={"card"} id={"card"}>
       
        <input
          type="number"
          id="inputCardNumber"
          min="1000000000000000"
          placeholder="0000000000000000"
          readOnly
        />
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
          <p>{user}</p>
          <input type="text" id="inputDate" placeholder="00/00" readOnly />
        </div>
      </section>


      <form onSubmit={handleSubmit} id="newCardForm" className="newCard" >
        <label htmlFor="cardNumber">Card Number:</label>
        <input
          type="number"
          name="cardNumber"
          id="cardNumber"
          min="1000000000000000"
          max="9999999999999999"
          placeholder="0000000000000000"
          onChange={() => {inputChange();}}
          required
        />
        <br />
        <label htmlFor="cardHolderName">Cardholder Name:</label>
        <input
          type="text"
          name="cardHolderName"
          id="cardHolderName"
          value={user}
          readOnly
        />
        <br />
        <div>
          <label htmlFor="validThru">Valid thru:</label>
          <input
            type="month"
            name="validThru"
            id="validThru"
            onChange={() => {
              inputChange();
            }}
            required
          />
          <label htmlFor="ccv">CCV:</label>
          <input
            type="number"
            name="ccv"
            id="ccv"
            min="0"
            max="999"
            placeholder="000"
            required
          />
        </div>
        <br />
        <label htmlFor="vendor">Vendor:</label>
        <select name="vendor" id="vendor" required  onChange={() => {updateVendor();}} >
          <option value="" selected disabled>Choose Vendor</option>
          <option value="notYourBank">Not Your Bank</option>
          <option value="comradeBank">Comrade Bank</option>
          <option value="ruptBank">Bank of Rupt</option>
          
        </select>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </main>
  );
};

export default NewCard;

//exempel på checka validity på kort

// var today, someday;
// var exMonth=document.getElementById("exMonth");
// var exYear=document.getElementById("exYear");
// today = new Date();
// someday = new Date();
// someday.setFullYear(exYear, exMonth, 1);

// if (someday < today) {
//    alert("The expiry date is before today's date. Please select a valid expiry date");
//    return false;
// }
