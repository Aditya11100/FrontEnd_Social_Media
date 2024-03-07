import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { hideLoader, showLoader } from "./loader";
import { ApiConfig } from "../Service/api";
import { baseUrl, url } from "../Service/url";
import { showToast } from "../Utils/functions";

const apiConfig = new ApiConfig();

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (data: any, { dispatch }) => {
    try {
      dispatch(showLoader());
      const response: any = await apiConfig.postJSON(
        data?.body,
        baseUrl + url.login
      );
      data?.successCallback(response);
      showToast(response?.data?.message, "success");
      dispatch(hideLoader());
      // setTokenHeader(response?.data?.token);
      // storage.setItem("userData", JSON.stringify(response?.data));
      return response?.data;
    } catch (error: any) {
      console.log("error", error);
      if (
        error?.response?.status === 402 &&
        error?.response?.data?.message === "Email not verified. Verify now."
      ) {
        showToast(
          error?.response?.data?.message || "Something went wrong",
          "info"
        );
        data?.verifyOtpException();
      } else {
        showToast(
          error?.response?.data?.message || "Something went wrong",
          "error"
        );
      }
      dispatch(hideLoader());
    }
  }
);

export const signUpUser = createAsyncThunk(
  "user/signUpUser",
  async (data: any, { dispatch }) => {
    try {
      dispatch(showLoader());
      const response: any = await apiConfig.postJSON(
        data?.body,
        baseUrl + url.signup
      );
      data?.successCallback(response);
      showToast(response?.data?.message, "success");
      dispatch(hideLoader());
      // setTokenHeader(response?.data?.token);
      // storage.setItem("userData", JSON.stringify(response?.data));
      return response?.data;
    } catch (error: any) {
      console.log("error", error);
      showToast(
        error?.response?.data?.message || "Something went wrong",
        "error"
      );
      dispatch(hideLoader());
    }
  }
);

export const verifyOtpApi = createAsyncThunk(
  "user/verifyOtp",
  async (data: any, { dispatch }) => {
    try {
      dispatch(showLoader());
      const response: any = await apiConfig.putJSON(
        data?.body,
        baseUrl + url.verifyOTP
      );
      data?.successCallback(response);
      showToast(response?.data?.message, "success");
      dispatch(hideLoader());
      // setTokenHeader(response?.data?.token);
      // storage.setItem("userData", JSON.stringify(response?.data));
      return response?.data;
    } catch (error: any) {
      console.log("error", error);
      showToast(
        error?.response?.data?.message || "Something went wrong",
        "error"
      );
      dispatch(hideLoader());
    }
  }
);

// Create the user slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    error: {
      type: "" as string,
      message: "" as string,
    },
    loggedIn: false,
    token: null,
    userData: null,
  },
  reducers: {
    resetState: (state, action) => {
      state.token = null;
      state.userData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = {
          type: "",
          message: "",
        };
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedIn = true;
        state.token = action.payload?.token;
        state.userData = action.payload?.data;
        sessionStorage.setItem(
          "userData",
          JSON.stringify(action.payload?.data)
        );
        sessionStorage.setItem("token", action.payload?.token);
      })
      .addCase(loginUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.error;
      });
    builder
      .addCase(verifyOtpApi.pending, (state) => {
        state.loading = true;
        state.error = {
          type: "",
          message: "",
        };
      })
      .addCase(verifyOtpApi.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedIn = true;
        state.token = action.payload?.token;
        state.userData = action.payload?.data;
        sessionStorage.setItem(
          "userData",
          JSON.stringify(action.payload?.data)
        );
        sessionStorage.setItem("token", action.payload?.token);
      })
      .addCase(verifyOtpApi.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const { resetState } = userSlice.actions;

export default userSlice.reducer;
