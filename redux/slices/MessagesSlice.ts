import { Iuser } from "./tokenSlice";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Imessage {
  id: string;
  author: "ME" | "PARTNER";
  message: string;
}

export interface Iconvo {
  id: string;
  messages: Imessage[];
  partner: Iuser;
}

interface addMessageAction extends Imessage {
  convoId: string;
}

const initialState: Iconvo[] = [
  {
    id: "convo 1",
    messages: [
      {
        author: "ME",
        id: "message 1",
        message: "Hi",
      },
      {
        author: "PARTNER",
        id: "message 2",
        message: "HI there",
      },
    ],
    partner: { email: "fsdfs", id: "fdsf", name: "ALEX" },
  },
  {
    id: "convo 2",
    messages: [
      {
        author: "PARTNER",
        id: "message 1",
        message: "Hi",
      },
    ],
    partner: {
      email: "fsdfs",
      id: "fdsf",
      name: "ALEX",
      avatar:
        "https://media.licdn.com/dms/image/C5603AQH-_13BcTuxMw/profile-displayphoto-shrink_100_100/0/1605695459455?e=1678320000&v=beta&t=3gKUUmumHWDyd7dMBX3aWOuEjYqHKHpnFTxjqV_B88I",
    },
  },
  {
    id: "convo 3",
    messages: [
      {
        author: "ME",
        id: "message 1",
        message: "Hi",
      },
      {
        author: "PARTNER",
        id: "message 2",
        message: "HI there",
      },
    ],
    partner: { email: "fsdfs", id: "fdsf", name: "ALEX" },
  },
];

export const messagesSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<Iconvo[]>) => {
      return state.concat(action.payload);
    },
    addMessage: (state, action: PayloadAction<addMessageAction>) => {
      state.map((convo) => {
        if (convo.id === action.payload.convoId) {
          convo.messages.push(action.payload);
        }
        return convo;
      });
      return;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setChats, addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
