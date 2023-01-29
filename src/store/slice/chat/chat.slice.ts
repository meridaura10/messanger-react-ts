import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IChatState, IPayloadChat } from "./types";
import { getDataFromLocalStorage, setDataToLoacalSorage } from "../../../utils/localstorage";


const initialState: IChatState = getDataFromLocalStorage('sC')  || {
  chatId: '',
  usersId: [],
  chatImg: '',
  chatName: '',
};

export const chatSlice = createSlice({
  initialState,
  name: "chat",
  reducers: {
    setSelectedChat: (state, actions:PayloadAction<IPayloadChat>) => {
        state.chatId = actions.payload.chatId
        state.chatName = actions.payload.chatName
        state.usersId = actions.payload.usersId
        state.chatImg = actions.payload.chatImg
        setDataToLoacalSorage('sC',JSON.stringify(actions.payload))
    },
  },
});

export const chatReducer = chatSlice.reducer;
export const chatActions = chatSlice.actions;
