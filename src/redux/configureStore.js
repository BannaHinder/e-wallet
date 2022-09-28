import { configureStore } from "@reduxjs/toolkit";
import cardsSlice from "../components/cardsSlice";
import userSlice from '../components/userSlice'

const store = configureStore({
    reducer: {
      cards: cardsSlice,
      user: userSlice
    }
  });
  
  export default store;