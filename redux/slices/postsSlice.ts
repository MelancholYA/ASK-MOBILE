import { Ichip } from "./chipsSlice";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Ianswer {
  id: string;
  user: {
    id: string;
    avatar: string;
    name: string;
  };
  replies: [
    {
      id: string;
      user: {
        id: string;
        avatar: string;
        name: string;
      };
      body: string;
    }
  ];
  body: string;
}

export interface Ipost {
  id: string;
  group?: {
    id: string;
    name: string;
  };
  user: {
    id: string;
    avatar: string;
    name: string;
  };
  body: string;
  chip: Ichip;
  answersLength: number;
  answers?: Ianswer[];
  liked: boolean;
}

const initialState: { posts: Ipost[]; postsToDisplay: Ipost[] } = {
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
      id: "fsdfqsdf",
      user: {
        avatar:
          "https://media.licdn.com/dms/image/C5603AQH-_13BcTuxMw/profile-displayphoto-shrink_100_100/0/1605695459455?e=1678320000&v=beta&t=3gKUUmumHWDyd7dMBX3aWOuEjYqHKHpnFTxjqV_B88I",
        id: "fdsqdg",
        name: "Yacine ouardi",
      },
      liked: true,
    },
    {
      answersLength: 10,
      body: "Whats the worst thing you ever did ?",
      chip: {
        icon: "application-brackets",
        label: "Tech",
      },
      id: "fsdfqfssd",
      user: {
        avatar:
          "https://media.licdn.com/dms/image/C5603AQH-_13BcTuxMw/profile-displayphoto-shrink_100_100/0/1605695459455?e=1678320000&v=beta&t=3gKUUmumHWDyd7dMBX3aWOuEjYqHKHpnFTxjqV_B88I",
        id: "fdsqdg",
        name: "Yacine ouardi",
      },
      liked: false,
    },
    {
      answersLength: 10,
      body: "Whats the worst thing you ever did ?",
      chip: {
        icon: "application-brackets",
        label: "Tech",
      },
      id: "fsdfqssdf",
      user: {
        avatar:
          "https://media.licdn.com/dms/image/C5603AQH-_13BcTuxMw/profile-displayphoto-shrink_100_100/0/1605695459455?e=1678320000&v=beta&t=3gKUUmumHWDyd7dMBX3aWOuEjYqHKHpnFTxjqV_B88I",
        id: "fdsqdg",
        name: "Yacine ouardi",
      },
      liked: false,
    },
    {
      answersLength: 10,
      body: "Whats the worst thing you ever did ?",
      chip: {
        icon: "application-brackets",
        label: "Tech",
      },
      id: "fsdfqfssdsd",
      user: {
        avatar:
          "https://media.licdn.com/dms/image/C5603AQH-_13BcTuxMw/profile-displayphoto-shrink_100_100/0/1605695459455?e=1678320000&v=beta&t=3gKUUmumHWDyd7dMBX3aWOuEjYqHKHpnFTxjqV_B88I",
        id: "fdsqdg",
        name: "Yacine ouardi",
      },
      liked: false,
    },
    {
      answersLength: 10,
      body: "Whats the worst thing you ever did ?",
      chip: {
        icon: "application-brackets",
        label: "Tech",
      },
      id: "sdfqsfssdf",
      user: {
        avatar:
          "https://media.licdn.com/dms/image/C5603AQH-_13BcTuxMw/profile-displayphoto-shrink_100_100/0/1605695459455?e=1678320000&v=beta&t=3gKUUmumHWDyd7dMBX3aWOuEjYqHKHpnFTxjqV_B88I",
        id: "fdsqdg",
        name: "Yacine ouardi",
      },
      liked: false,
    },
  ],
  postsToDisplay: [
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
      id: "fsdfqsdf",
      user: {
        avatar:
          "https://media.licdn.com/dms/image/C5603AQH-_13BcTuxMw/profile-displayphoto-shrink_100_100/0/1605695459455?e=1678320000&v=beta&t=3gKUUmumHWDyd7dMBX3aWOuEjYqHKHpnFTxjqV_B88I",
        id: "fdsqdg",
        name: "Yacine ouardi",
      },
      liked: true,
    },
    {
      answersLength: 10,
      body: "Whats the worst thing you ever did ?",
      chip: {
        icon: "application-brackets",
        label: "Tech",
      },
      id: "fsdfqfssd",
      user: {
        avatar:
          "https://media.licdn.com/dms/image/C5603AQH-_13BcTuxMw/profile-displayphoto-shrink_100_100/0/1605695459455?e=1678320000&v=beta&t=3gKUUmumHWDyd7dMBX3aWOuEjYqHKHpnFTxjqV_B88I",
        id: "fdsqdg",
        name: "Yacine ouardi",
      },
      liked: false,
    },
    {
      answersLength: 10,
      body: "Whats the worst thing you ever did ?",
      chip: {
        icon: "application-brackets",
        label: "Tech",
      },
      id: "fsdfqssdf",
      user: {
        avatar:
          "https://media.licdn.com/dms/image/C5603AQH-_13BcTuxMw/profile-displayphoto-shrink_100_100/0/1605695459455?e=1678320000&v=beta&t=3gKUUmumHWDyd7dMBX3aWOuEjYqHKHpnFTxjqV_B88I",
        id: "fdsqdg",
        name: "Yacine ouardi",
      },
      liked: false,
    },
    {
      answersLength: 10,
      body: "Whats the worst thing you ever did ?",
      chip: {
        icon: "application-brackets",
        label: "Tech",
      },
      id: "fsdfqfssdsd",
      user: {
        avatar:
          "https://media.licdn.com/dms/image/C5603AQH-_13BcTuxMw/profile-displayphoto-shrink_100_100/0/1605695459455?e=1678320000&v=beta&t=3gKUUmumHWDyd7dMBX3aWOuEjYqHKHpnFTxjqV_B88I",
        id: "fdsqdg",
        name: "Yacine ouardi",
      },
      liked: false,
    },
    {
      answersLength: 10,
      body: "Whats the worst thing you ever did ?",
      chip: {
        icon: "application-brackets",
        label: "Tech",
      },
      id: "sdfqsfssdf",
      user: {
        avatar:
          "https://media.licdn.com/dms/image/C5603AQH-_13BcTuxMw/profile-displayphoto-shrink_100_100/0/1605695459455?e=1678320000&v=beta&t=3gKUUmumHWDyd7dMBX3aWOuEjYqHKHpnFTxjqV_B88I",
        id: "fdsqdg",
        name: "Yacine ouardi",
      },
      liked: false,
    },
  ],
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Ipost[]>) => {
      state.posts.concat(action.payload);
      return state;
    },
    setPostsToDisplay: (state, action: PayloadAction<Ichip[]>) => {
      const chips = action.payload;
      const newArr: Ipost[] = [];

      if (chips.length === 0) {
        state.postsToDisplay = state.posts;
        return;
      }
      for (let i = 0; i < chips.length; i++) {
        state.posts.map((post) => {
          if (post.chip.label === chips[i].label) {
            newArr.push(post);
          }
        });
      }
      newArr.reverse();
      state.postsToDisplay = newArr;
    },
  },
});

export const { setPosts, setPostsToDisplay } = postsSlice.actions;

export default postsSlice.reducer;
