import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatId: null,
    chatName: null,
  },
  reducers: {
    setChat: (state, action) => {
      //console.log("state in chat >>>", state);
      state.chatId = action.payload.chatId;
      state.chatName = action.payload.chatName;
    },
  },
});

//console.log("chatSlice >>>", chatSlice);

export const { setChat } = chatSlice.actions;

export const selectChatName = (state) => state.chat.chatName;
export const selectChatId = (state) => state.chat.chatId;

export default chatSlice.reducer;
