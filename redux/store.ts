import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./slices/tokenSlice";
import noteReducer from "./slices/noteSlice";
import chipReducer from "./slices/chipsSlice";
import postsReducer from "./slices/postsSlice";

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    notification: noteReducer,
    chips: chipReducer,
    posts: postsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
