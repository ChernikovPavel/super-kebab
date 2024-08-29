import './App.css';
import Root from './Root';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import SigninPage from './pages/SigninPage/SigninPage';
import SignupPage from './pages/SignupPage/SignupPage';
import { useState, useEffect } from 'react';
import axiosInstance, { setAccessToken } from './tools/axiosInstance';
import ProfileSettingsPage from './pages/ProfileSettingsPage/ProfileSettingsPage';
import ProtectedRoute from './tools/ProtectedRoute';

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    axiosInstance
      .get(`${import.meta.env.VITE_API}/tokens/refresh`)
      .then((res) => {
        setUser(res.data.user);
        setAccessToken(res.data.accessToken);
      });
  }, []);
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root user={user} setUser={setUser} />,
      children: [
        {
          path: '/',
          element: <HomePage user={user} />,
        },
        {
          path: '/ProfileSettingsPage',

          element: (
            <ProtectedRoute authUser={user.username} redirectTo={'/'} isLogRequired>
              <ProfileSettingsPage user={user} />,
            </ProtectedRoute>
          ),
        },
        {
          path: '/signin',
          element: (
            <ProtectedRoute authUser={user.username} redirectTo={'/'}>
              <SigninPage setUser={setUser} />
            </ProtectedRoute>
          ),
        },
        {
          path: '/signup',
          element: (
            <ProtectedRoute authUser={user.username} redirectTo={'/'}>
              <SignupPage setUser={setUser} />
            </ProtectedRoute>
          ),
        },
      
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
