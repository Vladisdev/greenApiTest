import styles from './Chat.module.css';
import { Aside } from '../../components/Aside/Aside.jsx';
import { Messenger } from '../../components/Messenger/Messanger';

export const Chat = () => {
  return (
    <div className={styles.chat}>
      <Aside/>
      <Messenger/>
    </div>
  );
};
