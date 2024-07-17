import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetials : [],
  currentAdmin: null,
  selectedUser: null,
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
    selectUserStart: (state,action) => {
      state.selectedUser = action.payload;
    },
    selectUserEnd: (state,action) => {
      state.selectedUser = action.payload;
    },
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess : (state) => {
      state.error = false;
      state.loading = false;
    },
    updateUserFailure : (state,action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createUserClear: (state) => {
      state.loading = false;
      state.error = false;
    },
    createUserStart: (state) => {
      state.loading = true;
    },
    createUserSuccess: (state) => {
      state.loading = false;
      state.error = false;
    },
    createUserFaliure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signOut: (state) => {
      state.currentAdmin = null;
      state.loading = false;
      state.error = false;
    },
  },
});

export const {
  signInFailure,
  signInStart,
  signInSuccess,
  signInAndUpClear,
  selectUserStart,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  createUserStart,
  createUserSuccess,
  createUserFaliure,
  createUserClear,
  selectUserEnd,
  signOut,
} = adminSlice.actions;

export default adminSlice.reducer;
