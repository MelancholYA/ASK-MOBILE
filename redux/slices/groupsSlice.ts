import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import { Ipost } from "./postsSlice";
import { Ichip } from "./chipsSlice";

export interface Igroup {
  _id: string;
  name: string;
  cover?: string;
  description: string;
  avatar?: string;
  membersLength: number;
  topic: string;
  postsLength?: number;
  posts?: Ipost[];
  joined?: boolean;
}
interface Istate {
  groups: Igroup[];
  groupsToDesplay: Igroup[];
}

const initialState: Istate = {
  groups: [],
  groupsToDesplay: [],
};

export const grouspSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    setGroups: (state, action: PayloadAction<Igroup[]>) => {
      const groups = state.groups.slice();
      groups.push(...action.payload);
      return { ...state, groups };
    },
    setGroupsToDisplay: (state, action: PayloadAction<Ichip[]>) => {
      const chips = action.payload;
      const newArr: Igroup[] = [];

      if (chips.length === 0) {
        state.groupsToDesplay = state.groups;
        return;
      }
      for (let i = 0; i < chips.length; i++) {
        state.groups.map((group) => {
          if (group.topic === chips[i].label) {
            newArr.push(group);
          }
          return group;
        });
      }
      newArr.reverse();
      state.groupsToDesplay = newArr;
    },
    joinGroup: (state, action: PayloadAction<{ groupId: string }>) => {
      state.groups = [...state.groups].map((group) => {
        if (group._id === action.payload.groupId) {
          return { ...group, joined: true };
        }
        return group;
      });
    },
    leaveGroup: (state, action: PayloadAction<{ groupId: string }>) => {
      state.groups = [...state.groups].map((group) => {
        if (group._id === action.payload.groupId) {
          return { ...group, joined: false };
        }
        return group;
      });
    },
    addGroup: (state, action: PayloadAction<Igroup>) => {
      state.groups.unshift(action.payload);
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setGroups,
  setGroupsToDisplay,
  joinGroup,
  leaveGroup,
  addGroup,
} = grouspSlice.actions;

export default grouspSlice.reducer;
