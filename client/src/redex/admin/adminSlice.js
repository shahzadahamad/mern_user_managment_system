import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentAdmin: null,
  loading: false,
  error: false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInAndUpClear: (state) => {
      state.loading = false;
      state.error = false;
    },
    signInSuccess: (state, action) => {
      state.currentAdmin = action.payload;
      state.loading = false;
      state.error = false;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { signInFailure, signInStart, signInSuccess, signInAndUpClear } =
  adminSlice.actions;

export default adminSlice.reducer;