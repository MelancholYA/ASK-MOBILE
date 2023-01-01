import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface noteState {
  show: boolean;
  body: string;
}

const initialState: noteState = {
  show: false,
  body: "",
};

export const noteSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    show: (state, action: PayloadAction<string>) => {
      state.show = true;
      state.body = action.payload;
      return state;
    },
    dismiss: (state) => {
      state.show = false;
      state.body = "";
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { show, dismiss } = noteSlice.actions;

export default noteSlice.reducer;
