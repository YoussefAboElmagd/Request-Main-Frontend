// authService.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { signUp, signIn } from "../../Services/api.js";
import {
  authSuccess,
  authFailure,
  logoutSuccess,
  startAuth,
} from "../slices/authSlice.js";

// Sign Up Thunk
export const handleSignUp = createAsyncThunk(
  "auth/signUp",
  async (userData, { dispatch }) => {
    try {
      dispatch(startAuth());
      const response = await signUp(userData);
      localStorage.setItem("user", JSON.stringify(response.results));
      localStorage.setItem("authToken", response.token);
      dispatch(authSuccess({ user: response.results, token: response.token }));
    } catch (error) {
      dispatch(authFailure(error.message));
    }
  }
);

export const signInThunk = createAsyncThunk(
  "auth/signIn",
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      const response = await signIn({ email, password });

      // Save user and token to localStorage
      localStorage.setItem("user", JSON.stringify(response.isFound));
      localStorage.setItem("authToken", response.token);

      dispatch(
        authSuccess({
          user: response.isFound,
          token: response.token,
        })
      );
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Logout Thunk
export const handleLogout = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("authToken");
      dispatch(logoutSuccess());
    } catch (error) {
      dispatch(authFailure(error.message));
    }
  }
);
