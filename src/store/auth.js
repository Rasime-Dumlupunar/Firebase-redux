import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: false,
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = false;
    },
  },
});

export const { login, logout } = auth.actions;
export default auth.reducer;
