import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  creators: [],
};

export const creatorsSlice = createSlice({
  name: "creators",
  initialState,
  reducers: {
    setCreatorsDetails: (state, action) => {
      state.creators = action.payload;
      // console.log(state.creators)
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCreatorsDetails } = creatorsSlice.actions;

export default creatorsSlice.reducer;
