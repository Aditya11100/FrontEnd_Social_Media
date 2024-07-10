import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { hideLoader, showLoader } from "./loader";
import { ApiConfig } from "../Service/api";
import { baseUrl, url } from "../Service/url";
import { showToast } from "../Utils/functions";

const apiConfig = new ApiConfig();

export const getRequestList = createAsyncThunk(
  "friends/getRequestList",
  async (data: any, { dispatch }) => {
    try {
      dispatch(showLoader());
      const response: any = await apiConfig.getJSON(
        baseUrl + url.getRequestList
      );
      // data?.successCallback(response);
      dispatch(hideLoader());
      return response;
    } catch (error: any) {
      showToast(
        error?.response?.data?.message || "Something went wrong",
        "error"
      );
      dispatch(hideLoader());
    }
  }
);

// Create the friends slice
const friendsSlice = createSlice({
  name: "friends",
  initialState: {
    loading: false,
    error: {
      type: "" as string,
      message: "" as string,
    },
    requestsList: [] as any,
  },
  reducers: {
    resetState: (state, action) => {},
  },
  extraReducers: (builder) => {},
});

export const { resetState } = friendsSlice.actions;

export default friendsSlice.reducer;
