import { Iuser } from "./tokenSlice";
import { Ichip } from "./chipsSlice";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Ireply {
  _id: string;
  body: string;
  user: {
    _id: string;
    avatar?: string;
    cover?: string;
    firstName: string;
    lastName: string;
  };
}

export interface Ianswer {
  _id: string;
  user: {
    _id: string;
    avatar?: string;
    cover?: string;
    firstName: string;
    lastName: string;
  };
  repliesLength: number;
  replies?: Ireply[];
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
  repliesLength: number;
  user: {
    avatar: string;
    _id: string;
    firstName: string;
    lastName: string;
  };
}
interface IreplyBody {
  _id: string;
  postId: string;
  answerId: string;
  body: string;
  user: {
    _id: string;
    avatar?: string;
    cover?: string;
    firstName: string;
    lastName: string;
  };
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
      const { answerId, postId } = action.payload;

      state.posts.map((post) => {
        if (post._id === postId) {
          post.answers?.map((answer) => {
            if (answer._id === answerId) {
              answer.repliesLength++;
              if (!answer.replies) {
                answer.replies = [action.payload];
              } else {
                answer.replies.push(action.payload);
              }
            }
            return answer;
          });
        }
        return post;
      });
    },
    setReplies: (
      state,
      action: PayloadAction<{
        postId: string;
        answerId: string;
        replies: Ireply[];
      }>
    ) => {
      const { answerId, postId, replies } = action.payload;
      state.posts.map((post) => {
        if (post._id === postId) {
          post.answers?.map((answer) => {
            if (answer._id === answerId) {
              answer.replies = replies;
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
      const post = state.posts.filter(
        (post) => post._id === action.payload.postId
      )[0];
      const isExisting = post.answers
        ? post.answers.some((item1) =>
            action.payload.answers.some((item2) => item1._id === item2._id)
          )
        : false;

      if (isExisting) {
        return;
      }
      return {
        ...state,
        posts: state.posts.map((post, i) => {
          if (post._id === action.payload.postId) {
            return {
              ...post,
              answers: [...(post.answers || []), ...action.payload.answers],
            };
          }
          return post;
        }),
      };
    },
    clearAnswers: (state, action: PayloadAction<{ postId: string }>) => {
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.postId ? { ...post, answers: [] } : post
        ),
      };
    },
    clearPosts: (state) => {
      return {
        ...state,
        posts: [],
      };
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
  clearAnswers,
  clearPosts,
  setReplies,
} = postsSlice.actions;

export default postsSlice.reducer;
