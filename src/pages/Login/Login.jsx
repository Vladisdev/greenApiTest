import styles from './Login.module.css';

import { useState } from 'react';
import { userStateInstance } from '../../hooks/userStateInstance.js';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { CHAT_PAGE } from '../../constans/constans.js';
import { saveValues } from '../../redux/slices/instancesSlice.js';

export const Login = () => {
  const reduxFormValues = useSelector(state => state.instances);
  const dispatch = useDispatch();

  let isLoggedIn = false;

  const [isLoading, setIsLoading] = useState(false);
  const [formValuesState, setFormValuesState] = useState(reduxFormValues);
  const navigate = useNavigate();

  const onClickButton = async () => {
    setIsLoading(true);

    async function fetchUserStatus() {
      const userStatus = await userStateInstance(formValuesState.idInstance, formValuesState.apiTokenInstance);

      return userStatus === 'authorized';
    }

    isLoggedIn = await fetchUserStatus();
    setIsLoading(false);

    if (isLoggedIn) {
      navigate(CHAT_PAGE);
    } else {
      alert('Ваш аккаунт не авторизован. Отсканируйте QR код');
    }
  };


  const handleInputChange = (event) => {
    const {name, value} = event.target;

    setFormValuesState({
      ...formValuesState,
      [name]: value
    });


    dispatch(saveValues({
      ...formValuesState,
      [name]: value
    }));
  };


  return (
    <div className='container'>
      {
        isLoading ?
          (
            <h1 style={{textAlign: 'center'}}>Загрузка...</h1>
          ) :
          (
            <div className={styles.login}>
              <h1 className={styles.login__title}>Вход в аккаунт</h1>
              <form className={styles.form}>
                <input type='text'
                       value={formValuesState.idInstance}
                       name='idInstance' onChange={handleInputChange}
                       placeholder='IdInstance...'/>
                <input type='text' name='apiTokenInstance'
                       value={formValuesState.apiTokenInstance}
                       onChange={handleInputChange}
                       placeholder='ApiTokenInstance...'/>
                <button onClick={onClickButton} type={'button'} className={styles.form__action}>Войти</button>
              </form>
            </div>
          )
      }
    </div>
  );
};


