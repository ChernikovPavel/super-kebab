import { useEffect, useState } from "react";
import styles from "./AuthForm.module.css";
import { Input, Button, Select, Alert, AlertIcon } from "@chakra-ui/react";
import axiosInstance, { setAccessToken } from "../../tools/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function AuthForm({ title, type = "signin", setUser, showAlert, setShowAlert }) {
  const [inputs, setInputs] = useState({});
  const [role, setRole] = useState("user");
  const navigate = useNavigate();
  // const [alert, setAlert] = useState(false);

  const changeHandler = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const roleChangeHandler = (e) => {
    setRole(e.target.value);
  };

  
  const [errorMessage, setErrorMessage] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_API}/auth/${type}`,
        { ...inputs, role }
      );
      setUser(response.data.user);
      setAccessToken(response.data.accessToken);

      if (role === "courier") {
        setShowAlert(true);
      } else {
        setShowAlert(false)
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          setErrorMessage("Такой пользователь уже существует");
        } else if (error.response.status === 401) {
          setErrorMessage("Неверный пароль");
        } else {
          setErrorMessage("Произошла ошибка, попробуйте еще раз");
        }
      } else {
        console.error(error);
        setErrorMessage("Произошла ошибка, попробуйте еще раз");
      }
    }
  };
  useEffect(() => {
    
    if (showAlert) {
      
      const timer = setTimeout(() => {
        setShowAlert(false);
        navigate("/")
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [showAlert, setShowAlert]);

  return (
    <>
      <form onSubmit={submitHandler} className={styles.wrapper}>
        <h3 className={styles.head}>{title}</h3>
        {errorMessage && <div className={styles.error}>{errorMessage}</div>}

        <div className={styles.inputs}>
          {type === "signin" && (
            <>
              <Input
                onChange={changeHandler}
                borderColor="#3f3e3e"
                type="email"
                name="email"
                value={inputs?.email}
                placeholder="Эл.почта"
              />
              <Input
                onChange={changeHandler}
                borderColor="#3f3e3e"
                type="password"
                name="password"
                value={inputs?.password}
                placeholder="Пароль"
              />
            </>
          )}
          {type === "signup" && (
            <>
              <Input
                onChange={changeHandler}
                borderColor="#3f3e3e"
                name="username"
                value={inputs?.username}
                placeholder="Имя пользователя"
              />
              <Input
                onChange={changeHandler}
                borderColor="#3f3e3e"
                type="email"
                name="email"
                value={inputs?.email}
                placeholder="Эл.почта"
              />
              <Input
                onChange={changeHandler}
                borderColor="#3f3e3e"
                type="password"
                name="password"
                value={inputs?.password}
                placeholder="Пароль"
              />
              <Select
                value={role}
                onChange={roleChangeHandler}
                borderColor="#3f3e3e"
                placeholder="Выберите роль"
              >
                <option value="user">Пользователь</option>
                <option value="courier">Курьер</option>
              </Select>
            </>
          )}
        </div>
        <div className={styles.btns}>
          {type === "signin" && (
            <Button type="submit" colorScheme="blue">
              Вход
            </Button>
          )}
          {type === "signup" && (
            <Button type="submit" colorScheme="blue">
              Регистрация
            </Button>
          )}
        </div>
      </form>

      {/* {showAlert && (
        <Alert status="info">
          <AlertIcon />
          Сообщение админу о регистрации нового курьера отправлено.
          <Button
            onClick={() => navigate("/")}
            variant="link"
            marginLeft="10px"
          >
            Закрыть
          </Button>
        </Alert>
      )} */}
    </>
  );
}
