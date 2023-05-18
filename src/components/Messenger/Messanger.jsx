import styles from './Messenger.module.css';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Message } from '../Message/Message';

import { sendMessage } from '../../hooks/sendMessage.js';
import { addMessage } from '../../redux/slices/messagesSlice.js';
import { getNotification } from '../../hooks/getOtherMessage.js';

export const Messenger = () => {
  const activeChat = useSelector(state => state.chats.activeChat);
  const {idInstance, apiTokenInstance} = useSelector(state => state.instances);
  const userMessages = useSelector(state => state.messages.myMessages);
  const otherMessages = useSelector(state => state.messages.otherMessages);
  const dispatch = useDispatch();

  const [message, setMessage] = useState('');
  // const [otherMessageData, setOtherMessageData] = useState([]);

  const headerText = activeChat ? `Переписка ведется с абонентом: ${activeChat}` : 'Введите номер собеседника и начните беседу!';
  const isButtonDisabled = !(message.length && activeChat.length);

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const onClickSend = (number, message) => {
    sendMessage(idInstance, apiTokenInstance, number, message);
    dispatch(addMessage({owner: 'iAm', message}));
  };

  useEffect(() => {
    const fetchOtherMessage = async () => {
      const {sender, message} = await getNotification(idInstance, apiTokenInstance);

      if (sender && message) {
        dispatch(addMessage({owner: sender, message}));
      }
    };
    fetchOtherMessage();
  }, []);


  return (
    <div className={styles.content}>
      <h2 className={styles.content__header}>{headerText}</h2>
      <div className={styles.content__body}>
        <div className={styles.body__otherMessages}>
          <ul className='messages'>
            {
              otherMessages?.map(item => (
                activeChat === item.sender?.match(/[0-9]+/)[0] ?
                  <Message key={item.sender} message={item.message} owner={'other'}/> : null
              ))
            }
          </ul>
        </div>
        <div className={styles.body__userMessages}>
          <ul className='messages'>
            {
              userMessages?.map(item => (
                <Message key={item} message={item} owner={'you'}/>
              ))
            }
          </ul>
        </div>
      </div>
      <div className={styles.content__input}>
        <input value={message} onChange={handleInputChange} type='text' placeholder='Ваше сообщение...'/>
        <button disabled={isButtonDisabled} onClick={() => onClickSend(activeChat, message)}>Отправить</button>
      </div>
    </div>
  );
};
