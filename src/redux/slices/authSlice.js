import { createSlice } from "@reduxjs/toolkit";
import { encryptToken } from "../../libs/crypto";

const initialState = {
  accessToken: null,
  //   refreshToken: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokens: (state, action) => {
      const { accessToken } = action.payload;
      state.accessToken = encryptToken(accessToken);
      state.isAuthenticated = !!accessToken;
    },
    systemLogout: (state) => {
      state.accessToken = null;
      //   state.refreshToken = null;
      state.isAuthenticated = false;
    },
  },
});

export const { systemLogout, setTokens } = authSlice.actions;

export default authSlice.reducer;
