import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: null,
  message: null,
};

const errorSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setErrorInfo: (state, action) => {
      state.type = action.payload.type;
      state.message = action.payload.message;
    },
    removeErrorInfo: (state) => {
      state.type = null;
      state.message = null;
    },
  },
});

export const { setErrorInfo, removeErrorInfo } = errorSlice.actions;

export default errorSlice.reducer;
