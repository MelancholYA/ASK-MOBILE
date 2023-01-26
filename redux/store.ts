import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./slices/tokenSlice";
import noteReducer from "./slices/noteSlice";
import chipReducer from "./slices/chipsSlice";
import postsReducer from "./slices/postsSlice";
import groupsReducer from "./slices/groupsSlice";
import chatsReducer from "./slices/MessagesSlice";
import notificationsReducer from "./slices/notificationsSlice";

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    notification: noteReducer,
    chips: chipReducer,
    posts: postsReducer,
    groups: groupsReducer,
    chats: chatsReducer,
    notifications: notificationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
