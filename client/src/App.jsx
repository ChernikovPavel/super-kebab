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
import CourierProfilePage from './pages/CourierProfilePage/CourierProfilePage';
import CostumerProfilePage from './pages/CostumerProfilePage/CostumerProfilePage';

function App() {
  const [user, setUser] = useState({});
  const [showAlert, setShowAlert] = useState(false);

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
            <ProtectedRoute
              authUser={user.username}
              redirectTo={'/'}
              isLogRequired
             showAlert={showAlert} setShowAlert={setShowAlert}>
              <ProfileSettingsPage user={user} />,
            </ProtectedRoute>
          ),
        },
        {
          path: '/CourierProfilePage',

          element: (
            <ProtectedRoute
              authUser={user.username}
              redirectTo={'/'}
              isLogRequired
            >
              <CourierProfilePage user={user} />,
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
            <ProtectedRoute authUser={user.username} redirectTo={'/'}showAlert={showAlert} setShowAlert={setShowAlert}>
              <SignupPage setUser={setUser} showAlert={showAlert} setShowAlert={setShowAlert} />
             </ProtectedRoute>
          ),
        },
        {
          path: '/CustomerProfilePage',
          element: (
            <ProtectedRoute
              authUser={user.username}
              redirectTo={'/'}
              isLogRequired
            >
              <CostumerProfilePage user={user} />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
