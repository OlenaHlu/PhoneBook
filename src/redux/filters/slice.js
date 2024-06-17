import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: { name: "", number: "" },
  reducers: {
    setStatusFilter: (state, action) => {
      const { name, number } = action.payload;
      if (name !== undefined) {
        state.name = name;
      }
      if (number !== undefined) {
        state.number = number;
      }
    },
  },
});

export const { setStatusFilter } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
