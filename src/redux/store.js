import { configureStore } from '@reduxjs/toolkit';

import instancesReducer from './slices/instancesSlice.js';
import chatsReducer from './slices/chatsSlice.js';
import messagesReducer from './slices/messagesSlice.js';

export const store = configureStore({
  reducer: {
    instances: instancesReducer,
    chats: chatsReducer,
    messages: messagesReducer
  }
});