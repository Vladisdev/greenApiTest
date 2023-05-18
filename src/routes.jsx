import { createBrowserRouter } from 'react-router-dom';

import { CHAT_PAGE, LOGIN_PAGE } from './constans/constans.js';

import { Login } from './pages/Login/Login.jsx';
import { Chat } from './pages/Chat/Chat.jsx';

export const router = createBrowserRouter([
  {
    path: LOGIN_PAGE,
    element: <Login/>
  },
  {
    path: CHAT_PAGE,
    element: <Chat/>
  },
]);

