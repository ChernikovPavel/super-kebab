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
import OrderCard from './components/Cards/OrderCard';
import FormAddress from './components/AuthForm/FormAddress/FormAddress';

function App() {
  const [user, setUser] = useState({});
  const [address, setAddress] = useState();
  const [selectedOrder, setSelectedOrder] = useState(null); // Стейт показывает заказ выбранный на карте по маркеру
  const [sortOrderForDelivery, setSortOrderForDelivery] = useState();

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
          element: (
            <HomePage
              sortOrderForDelivery={sortOrderForDelivery}
              setSortOrderForDelivery={setSortOrderForDelivery}
              selectedOrder={selectedOrder}
              setSelectedOrder={setSelectedOrder}
              user={user}
            />
          ),
        },
        {
          path: '/order/:id',

          element: <OrderCard user={user} />,
        },
        {
          path: '/form/address/:id',

          element: (
            <FormAddress
              sortOrderForDelivery={sortOrderForDelivery}
              setSortOrderForDelivery={setSortOrderForDelivery}
              selectedOrder={selectedOrder}
              setSelectedOrder={setSelectedOrder}
              address={address}
              setAddress={setAddress}
              user={user}
            />
          ),
        },
        {
          path: '/ProfileSettingsPage',

          element: (
            <ProtectedRoute
              authUser={user.username}
              redirectTo={'/'}
              isLogRequired
            >
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
