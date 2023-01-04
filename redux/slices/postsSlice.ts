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
  replies?: [
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

interface IanswerBody {
  postId: string;
  answerBody: string;
}
interface IreplyBody {
  postId: string;
  answerId: string;
  replyBody: string;
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
    {
      answersLength: 10,
      body: "Whats the worst thing you ever did ?",
      chip: {
        icon: "application-brackets",
        label: "Tech",
      },
      id: "id2",
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
      id: "id3",
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
      id: "id4",
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
      id: "id5",
      user: {
        avatar:
          "https://media.licdn.com/dms/image/C5603AQH-_13BcTuxMw/profile-displayphoto-shrink_100_100/0/1605695459455?e=1678320000&v=beta&t=3gKUUmumHWDyd7dMBX3aWOuEjYqHKHpnFTxjqV_B88I",
        id: "fdsqdg",
        name: "Yacine ouardi",
      },
      liked: false,
    },
  ],
  postsToDisplay: [],
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
    answerQuestion: (state, action: PayloadAction<IanswerBody>) => {
      const answer = {
        body: action.payload.answerBody,
        id: "s32gq",
        user: {
          avatar:
            "https://media.licdn.com/dms/image/D4D35AQFIOp-HBmIG_w/profile-framedphoto-shrink_100_100/0/1661764145277?e=1673452800&v=beta&t=Vo-i54ez2D96hTV7QzPa1vxv0I984veG7e7rKBUTmuk",
          id: "1452",
          name: "user",
        },
      };
      state.posts.map((post) => {
        if (post.id === action.payload.postId) {
          if (!post.answers) {
            post.answers = [answer];
          } else {
            post.answers.push(answer);
          }
        }
        return post;
      });
    },
    replyToAnswer: (state, action: PayloadAction<IreplyBody>) => {
      const { answerId, postId, replyBody } = action.payload;
      const reply = {
        body: replyBody,
        id: "s32gq",
        user: {
          avatar:
            "https://media.licdn.com/dms/image/D4D35AQFIOp-HBmIG_w/profile-framedphoto-shrink_100_100/0/1661764145277?e=1673452800&v=beta&t=Vo-i54ez2D96hTV7QzPa1vxv0I984veG7e7rKBUTmuk",
          id: "1452",
          name: "user",
        },
      };
      state.posts.map((post) => {
        if (post.id === postId) {
          post.answers?.map((answer) => {
            if (answer.id === answerId) {
              if (!answer.replies) {
                answer.replies = [reply];
              } else {
                answer.replies.push(reply);
              }
            }
            return answer;
          });
        }
        return post;
      });
    },
  },
});

export const { setPosts, setPostsToDisplay, answerQuestion, replyToAnswer } =
  postsSlice.actions;

export default postsSlice.reducer;
