import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  idInstance: '',
  apiTokenInstance: '',

};

export const instancesSlice = createSlice({
  name: 'instances',
  initialState,
  reducers: {
    saveValues: ((state, action) => state = action.payload)
  }
});

export const {saveValues} = instancesSlice.actions;

export default instancesSlice.reducer;