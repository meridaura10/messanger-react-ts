import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUserState } from "./types";
import { IUser } from "../../../types/userType";
import { fetchUsersFromFirebase } from "../../asyncThunk/user.thunk";

const initialState: IUserState = {
  isAuth: false,
  isLoading: true,
  error: "",
  user: null as IUser | null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, actions: PayloadAction<IUser | null>) => {
      state.user = actions.payload;
      state.isLoading = false;
      state.error = "";
      state.isAuth = actions.payload?.id ? true : false;
    },
    removeUser: (state, actions: PayloadAction<IUser>) => {
      state.user = {
        email: "",
        id: "",
        img: "",
        name: "",
      };
      state.isLoading = false;
      state.error = "";
      state.isAuth = false;
    },
    changeIsLoadingUser: (state, actions: PayloadAction<boolean>) => {
      state.isLoading = actions.payload;
    },
    setErrorUser: (state, actions: PayloadAction<string>) => {
      state.error = actions.payload;
    },
  },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
