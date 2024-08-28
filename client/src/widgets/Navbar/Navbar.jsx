import axiosInstance, { setAccessToken } from "../../axiosInstance";
import styles from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const logoutHandler = async () => {
    const response = await axiosInstance.get(
      `${import.meta.env.VITE_API}/auth/logout`
    );
    if (response.status === 200) {
      setUser({});
      setAccessToken("");
      navigate("/signin");
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* <div>
        <button onClick={() => navigate(-1)}>◀️</button>
        <button onClick={() => navigate(+1)}>▶️</button>
      </div> */}
      {/* <Link to="/signin">На главную</Link> */}
      {user?.username ? (
        
          <div className={styles.center}>
          <Link to="/">Главная</Link>
          <Link to="/ProfileSettingsPage">{user?.username} Личный кабинет </Link>       
          <Link onClick={logoutHandler}>Выйти</Link>
        </div>
        
      ) : (
        <>
          
          <div className={styles.center}>
            <Link to="/signin">Войти/</Link>
            <> </>
            <Link to="/signup">Регистрация</Link>
          </div>
        </>
      )}
    </div>
  );
}
