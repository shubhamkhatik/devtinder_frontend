import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    removeuser: (state) => {
      state.user = null;
    },
  },
});

export const { addUser, removeuser } = userSlice.actions;
export default userSlice.reducer;
