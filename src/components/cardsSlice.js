import { createSlice } from "@reduxjs/toolkit";

const cardsSlice = createSlice({
  name: "cardDeck",
  initialState: {
    status: "No data",
    cards: [
      {
        cardNumber: "9999 9999 9999 9999",
        cardHolderName: "LOADING",
        ccv: "999",
        validThru: "12/22",
        vendor: "ruptBank",
        id: 0,
        active: true,
      },
    ],
    latestId: 1,
  },
  reducers: {
    addCard: (state, action) => {
      state.cards.push(action.payload);
      state.latestId++;
    },
    initializeCard: (state, action) => {
      state.cards[0].cardHolderName = action.payload;
    },
    deleteCard: (state, action) => {
      const toDiscard = state.cards.findIndex(
        (card) => card.id === action.payload
      );
      console.log(toDiscard)
      if (!state.cards[toDiscard].active) {
        state.cards.splice(toDiscard, 1);
      } else {
        console.log("you can't delete active card");
      }
    },

    activateCard: (state, action) => {
      state.cards.forEach((card) => {
        card.active = false;
      });
      state.cards.forEach((card) => {
        if (card.id === action.payload) {
          card.active = true;
        }
      });
    },
  },
});
export const { addCard, deleteCard, initializeCard, activateCard } =
  cardsSlice.actions;
export default cardsSlice.reducer;
