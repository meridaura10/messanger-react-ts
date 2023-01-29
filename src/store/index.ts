import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slice/user/user.slice";
import { usersReducer } from "./slice/users/users.slice";
import { chatReducer } from "./slice/chat/chat.slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
