import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
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
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signUpStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    signUpSuccess: (state) => {
      state.loading = false;
    },
    signUpFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess : (state,action) => {
      state.currentUser = action.payload;
      state.error = false;
      state.loading = false;
    },
    updateUserFailure : (state,action) => {
      state.loading = false;
      state.error = action.payload;
    }
  },
});

export const {
  signInFailure,
  signInStart,
  signInSuccess,
  signInAndUpClear,
  signUpStart,
  signUpSuccess,
  signUpFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
