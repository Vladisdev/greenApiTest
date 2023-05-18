import { API_HOST } from '../constans/constans.js';

import axios from 'axios';

export const userStateInstance = async (idInstance, apiTokenInstance) => {
  const {data} = await axios.get(`${API_HOST}/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`);

  if (data) {
    return data.stateInstance;
  }
};