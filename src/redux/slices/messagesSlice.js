import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  myMessages: [],
  otherMessages: []
};


export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: ((state, action) => {
      if (action.payload.owner === 'iAm') {
        state.myMessages.push(action.payload.message);
      } else {
        state.otherMessages.push({sender: action.payload.owner, message: action.payload.message});
      }
    })
  }
});

export const {addMessage} = messagesSlice.actions;

export default messagesSlice.reducer;