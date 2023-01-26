import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface NotificationLink {
  path: "Question" | "Replies" | "Group";
  data: {
    postId?: string;
    answerId?: string;
    groupId?: string;
  };
}

export interface Inotification {
  id: string;
  title: string;
  message: string;
  avatar?: string;
  link: NotificationLink;
}

const initialState: Inotification[] = [
  {
    id: "notId 1",
    title: "Yacine answerd your question",
    message: "What's the worst thing you did ?",
    link: {
      path: "Question",
      data: {
        postId: "id1",
      },
    },
  },
  {
    id: "notId 2",
    title: "Yacine replyed to your answer",
    message: "i dont remember",
    avatar:
      "https://media.licdn.com/dms/image/C5603AQH-_13BcTuxMw/profile-displayphoto-shrink_100_100/0/1605695459455?e=1678320000&v=beta&t=3gKUUmumHWDyd7dMBX3aWOuEjYqHKHpnFTxjqV_B88I",
    link: {
      path: "Replies",
      data: {
        postId: "id1",
        answerId: "fdqd",
      },
    },
  },
];

export const botificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Inotification>) => {
      state.push(action.payload);
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addNotification } = botificationsSlice.actions;

export default botificationsSlice.reducer;
