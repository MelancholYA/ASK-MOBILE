import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface tokenState {
  value: string | null;
}

const initialState: tokenState = {
  value: null,
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setToken } = tokenSlice.actions;

export default tokenSlice.reducer;
