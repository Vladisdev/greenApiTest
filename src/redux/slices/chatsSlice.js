import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  _chats: [],
  activeChat: ''
};


export const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    createChat: ((state, action) => {
      state._chats.push(action.payload);
    }),
    selectChat: ((state, action) => {
      const foundItem = state._chats.find(item => item.value === action.payload);

      state.activeChat = foundItem.value;
    })
  }
});

export const {createChat, selectChat} = chatsSlice.actions;

export default chatsSlice.reducer;