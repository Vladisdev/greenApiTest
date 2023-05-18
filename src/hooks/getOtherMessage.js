import { API_HOST } from '../constans/constans.js';

import axios from 'axios';

export const getNotification = async (idInstance, apiTokenInstance) => {
  let response;
  let receivedMessage;

  while (response = await axios.get(`${API_HOST}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`)) {
    if (response.data !== null) {
      const data = response.data;
      const dataBody = data.body;

      if (dataBody.typeWebhook === 'incomingMessageReceived') {
        receivedMessage = dataBody.messageData.extendedTextMessageData.text;

        return {sender: dataBody.senderData.sender, message: receivedMessage};
      }
    }
  }
};


