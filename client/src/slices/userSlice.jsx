import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};
const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    signInStart: (state) => {
      (state.loading = true), (state.error = null);
    },
    signInSuccess: (state, action) => {
      (state.currentUser = action.payload),
        (state.loading = false),
        (state.error = null);
    },
    signInFaile: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },
  },
});
export const { signInFaile, signInSuccess, signInStart } = userSlice.actions;
export default userSlice.reducer;
