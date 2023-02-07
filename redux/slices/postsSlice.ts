import { Ichip } from "./chipsSlice";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Ianswer {
  _id: string;
  user: {
    _id: string;
    avatar?: string;
    cover?: string;
    firstName: string;
    lastName: string;
  };
  replies?: [
    {
      _id: string;
      user: {
        id: string;
        avatar?: string;
        cover?: string;
        firstName: string;
        lastName: string;
      };
      body: string;
    }
  ];
  body: string;
}

export interface Ipost {
  _id: string;
  group?: {
    id: string;
    name: string;
  };
  user: {
    _id: string;
    avatar?: string;
    cover?: string;
    firstName: string;
    lastName: string;
  };
  body: string;
  chip: Ichip;
  answersLength?: number;
  answers?: Ianswer[];
  liked?: boolean;
}

interface IanswerBody {
  _id: string;
  postId: string;
  body: string;
  user: {
    avatar: string;
    _id: string;
    firstName: string;
    lastName: string;
  };
}
interface IreplyBody {
  postId: string;
  answerId: string;
  replyBody: string;
}

const initialState: { posts: Ipost[]; postsToDisplay: Ipost[] } = {
  posts: [],
  postsToDisplay: [],
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Ipost[]>) => {
      return {
        ...state,
        posts: [...state.posts, ...action.payload],
      };
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
      state.posts.map((post) => {
        if (post._id === action.payload.postId) {
          if (!post.answers) {
            post.answers = [action.payload];
          } else {
            post.answers.push(action.payload);
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
        if (post._id === postId) {
          post.answers?.map((answer) => {
            if (answer._id === answerId) {
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
    deletePost: (state, action: PayloadAction<string>) => {
      let newState = state.posts.filter((post) => post._id !== action.payload);
      state.posts = newState;
    },
    addPost: (state, action: PayloadAction<Ipost>) => {
      state.posts.unshift(action.payload);
      return state;
    },
    addAnswers: (
      state,
      action: PayloadAction<{ postId: string; answers: Ianswer[] }>
    ) => {
      state.posts.map((post) => {
        if (post._id === action.payload.postId) {
          post.answers = action.payload.answers;
        }
        return post;
      });
    },
  },
});

export const {
  setPosts,
  setPostsToDisplay,
  answerQuestion,
  replyToAnswer,
  addPost,
  deletePost,
  addAnswers,
} = postsSlice.actions;

export default postsSlice.reducer;
