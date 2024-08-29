import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';

export default function Root({ user, setUser }) {
  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <p>kurt</p>
      <div style={{ marginTop: '70px'}}>  
        <Outlet />
      </div>
    </>
  );
}
