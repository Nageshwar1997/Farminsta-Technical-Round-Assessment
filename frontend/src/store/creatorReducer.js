import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  creators: [],
  currentCreator: {},
};

export const creatorsSlice = createSlice({
  name: "creators",
  initialState,
  reducers: {
    setCreatorsDetails: (state, action) => {
      state.creators = action.payload;
      // console.log(state.creators)
    },

    setCurrentCreator: (state, action) => {
      state.currentCreator = action.payload;
      // console.log(state.currentCreator);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCreatorsDetails, setCurrentCreator } = creatorsSlice.actions;

export default creatorsSlice.reducer;
