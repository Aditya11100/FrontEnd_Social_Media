import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ILoaderState {
  visible: boolean;
}

const initialState: ILoaderState = {
  visible: false,
};

export const loaderSlice = createSlice({
  name: "loader",
  initialState: initialState,
  reducers: {
    showLoader: (state: ILoaderState) => {
      state.visible = true;
    },
    hideLoader: (state: ILoaderState) => {
      state.visible = false;
    },
  },
});

export const { showLoader, hideLoader } = loaderSlice.actions;

export default loaderSlice.reducer;
