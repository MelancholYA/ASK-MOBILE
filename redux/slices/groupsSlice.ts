import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Ichip } from "./chipsSlice";

export interface Igroup {
  id: string;
  name: string;
  background?: string;
  description: string;
  avatar?: string;
  members: number;
  topic: string;
}
interface Istate {
  groups: Igroup[];
  groupsToDesplay: Igroup[];
}

const initialState: Istate = {
  groups: [
    {
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo officia inventore nulla voluptatibus quia nostrum ullam porro dolor, earum, at non, aperiam ipsa rem eum odio. In quaerat cumque, consectetur dolorem doloribus perspiciatis repellat sunt eveniet quo beatae eaque illum ipsa officia atque minima deleniti iure et nostrum odit maxime!",
      id: "group1",
      members: 10,
      name: "tech nerds",
      topic: "Tech",
    },
    {
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo officia inventore nulla voluptatibus quia nostrum ullam porro dolor, earum, at non, aperiam ipsa rem eum odio. In quaerat cumque, consectetur dolorem doloribus perspiciatis repellat sunt eveniet quo beatae eaque illum ipsa officia atque minima deleniti iure et nostrum odit maxime!",
      id: "group2",
      members: 10,
      name: "Philosophers",
      topic: "Sports",
      background:
        "https://media.licdn.com/dms/image/C4D22AQHvoaa0QuvT-Q/feedshare-shrink_2048_1536/0/1673079703267?e=1675900800&v=beta&t=ykaL_QaIpHem8KwwhTBCRpBkQUxhBOVJcRO4XBwyRwM",
      avatar:
        "https://scontent.forn1-2.fna.fbcdn.net/v/t39.30808-6/322500397_529648639127924_4244144289738010496_n.jpg?stp=dst-jpg_p526x296&_nc_cat=106&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeFFmH4Ci45VYrJ4UgVMNQFA9sa2EzKfEy_2xrYTMp8TLwIOJa-OZzrd8RLgM5iC_j_n1j96wkCn9MlTBpUXNM1U&_nc_ohc=60OvAhAXRnQAX9NZ-da&_nc_zt=23&_nc_ht=scontent.forn1-2.fna&oh=00_AfD-kBr0VaplsS97bkjaxMsmaPAXr0ZmK7lGYhdc1njOWw&oe=63BDF4FE",
    },
  ],
  groupsToDesplay: [],
};

export const grouspSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    setGroups: (state, action: PayloadAction<Igroup[]>) => {
      state.groups.concat(action.payload);
      return state;
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
  },
});

// Action creators are generated for each case reducer function
export const { setGroups, setGroupsToDisplay } = grouspSlice.actions;

export default grouspSlice.reducer;
