import styles from './Aside.module.css';
import InputMask from 'react-input-mask';

import { useDispatch, useSelector } from 'react-redux';

import { createChat, selectChat } from '../../redux/slices/chatsSlice';

export const Aside = () => {
  const chats = useSelector(state => state.chats._chats);
  const dispatch = useDispatch();


  const onPressEnter = (event) => {
    const _inputValue = event.target.value;
    const regexp = /^7\d{7,10}$/;


    if (event.key === 'Enter' && _inputValue.trim()) {
      if (regexp.test(_inputValue)) {
        dispatch(createChat({
          ...chats,
          value: _inputValue
        }));
        dispatch(selectChat(_inputValue));
      } else {
        alert('Провеьте введеное вами значение');
      }
    }
  };

  const onClickChat = (event) => {
    dispatch(selectChat(event.target.innerText));
  };

  return (
    <aside className={styles.aside}>
      <div className='input'>
        <InputMask mask='99999999999' type='text' onKeyDown={onPressEnter}
                   placeholder='Номер телефона'/>
      </div>
      <ul className={styles.aside__list}>
        {
          chats.map(item => (
            <li onClick={onClickChat} key={item.value} className={styles.list__item}>
              <div className={styles.number}>{item.value}</div>
            </li>
          ))
        }
      </ul>
    </aside>
  );
};
