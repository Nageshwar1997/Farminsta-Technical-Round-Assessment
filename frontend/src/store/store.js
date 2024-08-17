import { configureStore } from "@reduxjs/toolkit";
import creatorsReducer from "./creatorReducer";

export const store = configureStore({
  reducer: {
    creators: creatorsReducer,
  },
});
