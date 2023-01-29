import { RootState } from "../store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/slice/user/user.slice";
import { bindActionCreators } from "@reduxjs/toolkit";
import { fetchUsersFromFirebase } from "../store/asyncThunk/user.thunk";
import { chatActions } from "../store/slice/chat/chat.slice";

const actions = {
  ...userActions,
  ...chatActions,
  fetchUsersFromFirebase,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
