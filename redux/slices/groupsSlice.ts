import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import { Ipost } from "./postsSlice";
import { Ichip } from "./chipsSlice";

export interface Igroup {
  id: string;
  name: string;
  background?: string;
  description: string;
  avatar?: string;
  members: number;
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
  groups: [
    {
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo officia inventore nulla voluptatibus quia nostrum ullam porro dolor, earum, at non, aperiam ipsa rem eum odio. In quaerat cumque, consectetur dolorem doloribus perspiciatis repellat sunt eveniet quo beatae eaque illum ipsa officia atque minima deleniti iure et nostrum odit maxime!",
      id: "group1",
      members: 10,
      name: "tech nerds",
      topic: "Tech",
      postsLength: 25,
      joined: true,
      posts: [
        {
          answersLength: 10,
          body: "Whats the worst thing you did ?",
          group: {
            id: "sdfgqsdf",
            name: "tech nerds",
          },
          chip: {
            icon: "application-brackets",
            label: "Sports",
          },
          id: "id1",
          user: {
            avatar:
              "https://media.licdn.com/dms/image/C5603AQH-_13BcTuxMw/profile-displayphoto-shrink_100_100/0/1605695459455?e=1678320000&v=beta&t=3gKUUmumHWDyd7dMBX3aWOuEjYqHKHpnFTxjqV_B88I",
            id: "fdsqdg",
            name: "Yacine ouardi",
          },
          liked: true,
          answers: [
            {
              body: "i dont remember",
              id: "fdqd",
              user: {
                avatar:
                  "https://media.licdn.com/dms/image/C5603AQH-_13BcTuxMw/profile-displayphoto-shrink_100_100/0/1605695459455?e=1678320000&v=beta&t=3gKUUmumHWDyd7dMBX3aWOuEjYqHKHpnFTxjqV_B88I",
                id: "fdsqdg",
                name: "Yacine ouardi",
              },
              replies: [
                {
                  body: "gdqgfdgsqdf",
                  id: "fdsqfdfsq",
                  user: {
                    avatar:
                      "https://media.licdn.com/dms/image/C5603AQH-_13BcTuxMw/profile-displayphoto-shrink_100_100/0/1605695459455?e=1678320000&v=beta&t=3gKUUmumHWDyd7dMBX3aWOuEjYqHKHpnFTxjqV_B88I",
                    id: "fdsqdg",
                    name: "Yacine ouardi",
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo officia inventore nulla voluptatibus quia nostrum ullam porro dolor, earum, at non, aperiam ipsa rem eum odio. In quaerat cumque, consectetur dolorem doloribus perspiciatis repellat sunt eveniet quo beatae eaque illum ipsa officia atque minima deleniti iure et nostrum odit maxime!",
      id: "group2",
      members: 10,
      name: "Philosophers",
      topic: "Sports",
      postsLength: 250,
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
    joinGroup: (state, action: PayloadAction<{ groupId: string }>) => {
      state.groups = [...state.groups].map((group) => {
        if (group.id === action.payload.groupId) {
          return { ...group, joined: true };
        }
        return group;
      });
    },
    leaveGroup: (state, action: PayloadAction<{ groupId: string }>) => {
      state.groups = [...state.groups].map((group) => {
        if (group.id === action.payload.groupId) {
          return { ...group, joined: false };
        }
        return group;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { setGroups, setGroupsToDisplay, joinGroup, leaveGroup } =
  grouspSlice.actions;

export default grouspSlice.reducer;
