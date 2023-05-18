import styles from './Message.module.css';

import { useSelector } from 'react-redux';

export const Message = (props) => {
  const otherNumber = useSelector(state => state.chats.activeChat);

  // eslint-disable-next-line react/prop-types
  const messageOwner = props.owner === 'you' ? 'You' : otherNumber;

  return (
    <div className={styles.message__item}>
      <p className={styles.item__title}>{messageOwner}</p>
      <p className={styles.item__text}>{props.message}</p>
    </div>
  );
};
