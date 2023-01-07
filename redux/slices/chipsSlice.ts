import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Ichip {
  label: string;
  icon: string;
}
interface IfilterBody {
  page:
    | "homePageChips"
    | "newQuestionChips"
    | "groupFilterChips"
    | "newGroupChips";
  chip: Ichip;
}

const initialState: {
  chips: Ichip[];
  homePageChips: Ichip[];
  newQuestionChips: Ichip[];
  groupFilterChips: Ichip[];
  newGroupChips: Ichip[];
} = {
  chips: [
    {
      icon: "application-brackets",
      label: "Tech",
    },
    {
      icon: "arm-flex",
      label: "Sports",
    },
    {
      icon: "baby-bottle",
      label: "Babies",
    },
    {
      icon: "bandage",
      label: "Health",
    },
    {
      icon: "bank",
      label: "Finance",
    },
    {
      icon: "bookshelf",
      label: "Books",
    },
    {
      icon: "cat",
      label: "Pets",
    },
    {
      icon: "chef-hat",
      label: "Food",
    },
    {
      icon: "controller-classic",
      label: "Games",
    },
    {
      icon: "headphones",
      label: "Music",
    },
    {
      icon: "heart",
      label: "Romance",
    },
  ],
  homePageChips: [],
  newQuestionChips: [],
  groupFilterChips: [],
  newGroupChips: [],
};

export const chipSlice = createSlice({
  name: "chips",
  initialState,
  reducers: {
    setChips: (state, action: PayloadAction<Ichip[]>) => {
      state.chips = action.payload;
      return state;
    },

    setFilters: (state, action: PayloadAction<IfilterBody>) => {
      const { page } = action.payload;
      if (
        state[page]
          .map((chip) => chip.label)
          .includes(action.payload.chip.label)
      ) {
        state[page] = state[page].filter(
          (chip) => chip.label !== action.payload.chip.label
        );
      } else {
        state[page].push(action.payload.chip);
      }
    },
  },
});

export const { setChips, setFilters } = chipSlice.actions;

export default chipSlice.reducer;
