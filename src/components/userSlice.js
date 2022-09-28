import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

 export const getRandomUser = createAsyncThunk(
    "user/getRandomUser",
    async () => {
      return fetch(`https://randomuser.me/api`)
        .then((res) => (res.json()))
        .catch((error) => {
          console.log(error);
        });
        
    }
  );

const userSlice = createSlice({
    name: "user",
  initialState: {
    user: null,
    status: "No data",
  },
  reducers: {
    
  },
  extraReducers: {
    [getRandomUser.fulfilled]: (state, action) => {
        console.log(action.payload);
         const [{name:{first, last}}] = action.payload.results
        state.user = (first + ' ' + last).toUpperCase();
        state.status = "Found data!";
      },
      [getRandomUser.pending]: (state, action) => {
        state.status = "Loading data...";
      },
      [getRandomUser.rejected]: (state, action) => {
        state.status = "Failed to get data";
      },
  }
})
export default userSlice.reducer;