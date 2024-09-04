import { createSlice } from "@reduxjs/toolkit";
const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  if (user === null || user === undefined) {
    return null;
  }
  try {
    return JSON.parse(user);
  } catch (error) {
    console.error("Error parsing user from localStorage", error);
    return null;
  }
};

const initialState = {
  user: getUserFromLocalStorage(),
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startAuth(state) {
      state.isLoading = true;
      state.error = null;
    },
    authSuccess(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },
    authFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    logoutSuccess(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { startAuth, authSuccess, authFailure, logoutSuccess } =
  authSlice.actions;
export default authSlice.reducer;
