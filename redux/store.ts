import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./slices/tokenSlice";
import noteReducer from "./slices/noteSlice";

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    notification: noteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
