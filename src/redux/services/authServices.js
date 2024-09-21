// authService.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  signUp,
  signIn,
  updateUser,
  uploadAvatar,
  uploadCompanyFiles,
} from "../../Services/api.js";
import {
  authSuccess,
  authFailure,
  logoutSuccess,
  startAuth,
} from "../slices/authSlice.js";
import { DataURItoBlob } from "../../utils/dataURItoBlob.jsx";


// Sign Up Thunk
export const handleSignUp = createAsyncThunk(
  "auth/signUp",
  async (userData, { dispatch }) => {
    try {
      dispatch(startAuth());
      const response = await signUp(userData);
      console.log("response ======>>>  ", response);

      dispatch(authSuccess({ user: response.results, token: response.token }));
      return response;
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
      console.log("Response :: => ", response);

      dispatch(
        authSuccess({
          user: response.userData,
          token: response.token,
        })
      );
      return response;
    } catch (error) {
      dispatch(
        authFailure(error.response ? error.response.data : error.message)
      );
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
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
    { updatedData, profilePic, companyFiles },
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
        const formData = new FormData();
        formData.append("avatar", profilePic);
        const avatarResponse = await uploadAvatar(userId, formData, token);
        userUpdated = { ...userUpdated, profilePic: avatarResponse.profilePic };
      }

      // Upload company files if provided
      if (companyFiles) {
        const formData = new FormData();
        formData.append("companyLogo", companyFiles.companyLogo);
        formData.append("electronicStamp", companyFiles.electronicStamp);

        // Convert signature from base64 to blob and append it to FormData
        const signatureBlob = DataURItoBlob(companyFiles.signature);
        formData.append("signature", signatureBlob, "signature.jpg");

        console.log("FormData being sent: ", formData);
 
        // Upload the company files
        const companyFilesResponse = await uploadCompanyFiles(
          userId,
          token,
          formData
        );

        console.log("Company Files Response => ", companyFilesResponse);

        // Update the user object with new file URLs
        userUpdated = {
          ...userUpdated,
          companyLogo: companyFilesResponse.companyLogo,
          electronicStamp: companyFilesResponse.electronicStamp,
          signature: companyFilesResponse.signature,
        };
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

// Helper function to convert base64 to Blob
const dataURItoBlob = (dataURI) => {
  const byteString = atob(dataURI.split(",")[1]);
  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ab], { type: mimeString });
};
