import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { hideLoader, showLoader } from "./loader";
import { ApiConfig } from "../Service/api";
import { baseUrl, url } from "../Service/url";
import { showToast } from "../Utils/functions";

const apiConfig = new ApiConfig();

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (data: any, { dispatch }) => {
    try {
      dispatch(showLoader());
      const response: any = await apiConfig.getJSON(
        baseUrl + url.getPosts + data?.params
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

export const likePosts = createAsyncThunk(
  "posts/likePosts",
  async (data: any, { dispatch }) => {
    try {
      const response: any = await apiConfig.putJSON(
        {},
        baseUrl + url.likePosts + "/" + data?.id
      );
      data?.successCallback(response);
      return response;
    } catch (error: any) {
      showToast(
        error?.response?.data?.message || "Something went wrong",
        "error"
      );
      data?.errorCallback(error);
    }
  }
);

export const dislikePosts = createAsyncThunk(
  "posts/dislikePosts",
  async (data: any, { dispatch }) => {
    try {
      const response: any = await apiConfig.putJSON(
        {},
        baseUrl + url.dislikePosts + "/" + data?.id
      );
      data?.successCallback(response);
      return response;
    } catch (error: any) {
      showToast(
        error?.response?.data?.message || "Something went wrong",
        "error"
      );
      data?.errorCallback(error);
    }
  }
);

export const commentPost = createAsyncThunk(
  "posts/commentPost",
  async (data: any, { dispatch }) => {
    try {
      const response: any = await apiConfig.putJSON(
        data?.body,
        baseUrl + url.commentPost + "/" + data?.id
      );
      data?.successCallback?.(response);
      dispatch(updatePostData(response));
      return response;
    } catch (error: any) {
      showToast(
        error?.response?.data?.message || "Something went wrong",
        "error"
      );
    }
  }
);

export const deleteCommentPost = createAsyncThunk(
  "posts/deleteCommentPost",
  async (data: any, { dispatch }) => {
    try {
      const response: any = await apiConfig.putJSON(
        data?.body,
        baseUrl + url.deleteCommentPost + "/" + data?.id + "/" + data?.commentId
      );
      dispatch(updatePostData(response));
      return response;
    } catch (error: any) {
      showToast(
        error?.response?.data?.message || "Something went wrong",
        "error"
      );
    }
  }
);

export const addPost = createAsyncThunk(
  "posts/addPost",
  async (data: any, { dispatch }) => {
    try {
      const response: any = await apiConfig.postJSON(
        data?.body,
        baseUrl + url.addPost
      );
      console.log("response", response);
      data?.successCallback?.(response);
      showToast(response?.data?.message, "success");
      return response;
    } catch (error: any) {
      showToast(
        error?.response?.data?.message || "Something went wrong",
        "error"
      );
    }
  }
);

// Create the user slice
const postsSlice = createSlice({
  name: "posts",
  initialState: {
    loading: false,
    error: {
      type: "" as string,
      message: "" as string,
    },
    postData: {} as any,
  },
  reducers: {
    resetState: (state, action) => {},
    updatePostData: (state, action) => {
      let postarray = current(state.postData?.data);
      postarray = postarray?.map((item: any) => {
        if (item?._id === action.payload?.data?.post?._id)
          return action.payload?.data?.post;
        else return item;
      });

      state.postData = {
        ...state.postData,
        data: postarray,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
        state.error = {
          type: "",
          message: "",
        };
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.postData = action.payload?.data;
      })
      .addCase(getPosts.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.error;
      });
    builder
      .addCase(likePosts.pending, (state) => {
        state.loading = true;
        state.error = {
          type: "",
          message: "",
        };
      })
      .addCase(likePosts.fulfilled, (state, action) => {
        state.loading = false;
        let postarray = current(state.postData?.data);
        postarray = postarray?.map((item: any) => {
          if (item?._id === action.payload?.data?.post?._id)
            return action.payload?.data?.post;
          else return item;
        });

        state.postData = {
          ...state.postData,
          data: postarray,
        };
      })
      .addCase(likePosts.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.error;
      });
    builder
      .addCase(dislikePosts.pending, (state) => {
        state.loading = true;
        state.error = {
          type: "",
          message: "",
        };
      })
      .addCase(dislikePosts.fulfilled, (state, action) => {
        state.loading = false;
        let postarray = current(state.postData?.data);
        postarray = postarray?.map((item: any) => {
          if (item?._id === action.payload?.data?.post?._id)
            return action.payload?.data?.post;
          else return item;
        });

        state.postData = {
          ...state.postData,
          data: postarray,
        };
      })
      .addCase(dislikePosts.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const { resetState, updatePostData } = postsSlice.actions;

export default postsSlice.reducer;
