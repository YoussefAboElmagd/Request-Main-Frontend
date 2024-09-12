// authService.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  signUp,
  signIn,
  updateUser,
  uploadAvatar,
} from "../../Services/api.js";
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
      console.log(response);

      localStorage.setItem("user", JSON.stringify(response.results));
      localStorage.setItem("token", response.token);

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
      localStorage.setItem("token", response.token);

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
      localStorage.removeItem("token");
      localStorage.removeItem("token");
      dispatch(logoutSuccess());
    } catch (error) {
      dispatch(authFailure(error.message));
    }
  }
);

export const handleUpdateUser = createAsyncThunk(
  "auth/updateUser",
  async (
    { updatedData, profilePic },
    { dispatch, getState, rejectWithValue }
  ) => {
    try {
      dispatch(startAuth());

      const state = getState();
      const { user, token } = state.auth;
      const userId = user._id;

      // Update user data
      const updateResponse = await updateUser(userId, updatedData, token);
      console.log("Update Response => ", updateResponse);

      let userUpdated = { ...user, ...updatedData };

      // Upload avatar if provided
      if (profilePic) {
        // Use FormData to handle file upload
        const formData = new FormData();
        formData.append("avatar", profilePic);
        const avatarResponse = await uploadAvatar(userId, profilePic, token);

        userUpdated = { ...userUpdated, profilePic: avatarResponse.profilePic };
      }

      // Save updated user data in local storage
      localStorage.setItem("user", JSON.stringify(userUpdated));

      // Update Redux store
      dispatch(authSuccess({ user: userUpdated, token }));

      return userUpdated;
    } catch (error) {
      console.error("Error updating user:", error);
      return rejectWithValue(error.message);
    }
  }
);
