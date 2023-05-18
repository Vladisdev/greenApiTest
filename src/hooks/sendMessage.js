import { API_HOST } from '../constans/constans.js';

import axios from 'axios';

export const sendMessage = async (idInstance, apiTokenInstance, number, message) => {
  await axios.post(`${API_HOST}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`, {
    chatId: `${number}@c.us`,
    message
  });
};