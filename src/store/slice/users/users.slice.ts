import { createSlice } from "@reduxjs/toolkit";
import { IUsersState } from "./types";
import { fetchUsersFromFirebase } from "../../asyncThunk/user.thunk";

const initialState: IUsersState = {
  isLoading: true,
  error: "",
  users: [],
};

export const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsersFromFirebase.pending, (state) => {
        state.error = "";
        state.isLoading = true;
      })
      .addCase(fetchUsersFromFirebase.fulfilled, (state, actions) => {
        state.users = actions.payload;
        state.isLoading = false;
        state.error = "";
      })
      .addCase(fetchUsersFromFirebase.rejected, (state, actions) => {
        console.log(actions.payload);
      });
  },
});

export const usersActions = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
