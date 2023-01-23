import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Iuser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  cover?: string;
  bio: string;
  friends?: Iuser[];
}

export interface tokenState {
  value: string | null;
  user?: Iuser;
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
    setUser: (state, action: PayloadAction<Iuser>) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setToken, setUser } = tokenSlice.actions;

export default tokenSlice.reducer;
