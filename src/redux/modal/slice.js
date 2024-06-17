import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isModalOpen: false,
    contactDeleteId: "",
  },
  reducers: {
    openModal: (state, action) => {
      state.isModalOpen = true;
      state.contactDeleteId = action.payload;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.contactDeleteId = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export const modalReducer = modalSlice.reducer;
