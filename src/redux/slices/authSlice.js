import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    email: "",
    password: "",
    name: "",
    phone: "",
    otp: "",
    isLoading: false,
    isLoadingSignIn: false,
    isLoadingSignUp: false,
    error: null,
  },
  reducers: {
    setEmail(state, action) {
      state.email = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
    setName(state, action) {
      state.name = action.payload;
    },
    setPhone(state, action) {
      state.phone = action.payload;
    },
    setOtp(state, action) {
      state.otp = action.payload;
    },
    startSignUp(state) {
      state.isLoadingSignUp = true;
      state.error = null;
    },
    finishSignUp(state) {
      state.isLoadingSignUp = false;
    },
    startSignIn(state) {
      state.isLoadingSignIn = true;
      state.error = null;
    },
    finishSignIn(state) {
      state.isLoadingSignIn = false;
    },
    setError(state, action) {
      state.error = action.payload;
      state.isLoadingSignIn = false;
      state.isLoadingSignUp = false;
    },
  },
});

export const {
  setEmail,
  setPassword,
  setName,
  setPhone,
  setOtp,
  startSignUp,
  finishSignUp,
  startSignIn,
  finishSignIn,
  setError,
} = authSlice.actions;

export default authSlice.reducer;
