import { Button, Input } from "@chakra-ui/react";
import  { useEffect, useState } from "react";
import axiosInstance from "../../tools/axiosInstance";
const { VITE_API } = import.meta.env;
import styles from "./ProfileSettingsPage.module.css";

export default function ProfileSettingsPage({user}) {
  const [username, setUsername] = useState({oldUsername: "", newUsername: ""});
  const [email, setEmail] = useState({ oldEmail: "", newEmail: "" });
  const [password, setPassword] = useState({ oldPassword: "", newPassword: ""});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
       if(user?.id){ 
        const res = await axiosInstance.get(
          `${VITE_API}/ProfileSettingsPage/${user?.id}`
        );
        
        if (res.status === 200) {
          setUsername({ ...username, oldUsername: res.data.username });
          setEmail({ ...email, oldEmail: res.data.email });
        }}
  } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user?.id]);

  
  const submitHandler = async (e, type) => {
    e.preventDefault();
    let data = {};
    if (type === "username") {
      data = {
        oldUsername: username.oldUsername,
        newUsername: username.newUsername,
      };
    } else if (type === "email") {
      data = { oldEmail: email.oldEmail, newEmail: email.newEmail };
    } else if (type === "password") {
      data = {
        oldPassword: password.oldPassword,
        newPassword: password.newPassword,
      };
    }
    try {
      const res = await axiosInstance.put(
        `${VITE_API}/ProfileSettingsPage/${user.id}`,
        data
      );
      if (res.status === 200) {
        // setEntries((prev) => [...prev, res.data]);
        setUsername({ oldUsername: "", newUsername: "" });
        setEmail({ oldEmail: "", newEmail: "" });
        setPassword({ oldPassword: "", newPassword: "" });
        alert("Changes succsessfuly saved")
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <>
      <div
        style={{
          backgroundImage: "url(/plum.jpg)",
          backgroundSize: "cover",
          backgroundRepeat: "repeat",
          backgroundPosition: "center",
          height: "120vh",
          width: "100vw",
        }}
      >
        <form
          onSubmit={(e) => submitHandler(e, "username")}
          className={styles.wrapper}
        >
          <h3 className={styles.head}>Поменять имя пользователя</h3>
          <div className={styles.inputs}>
            <Input
              onChange={(e) =>
                setUsername({ ...username, oldUsername: e.target.value })
              }
              borderColor="#3f3e3e"
              name="oldEmail"
              value={email.oldUsername}
              placeholder="Введите текущее имя пользователя"
            />
            <Input
              onChange={(e) =>
                setUsername({ ...username, newUsername: e.target.value })
              }
              borderColor="#3f3e3e"
              name="newEmail"
              value={email.newUsername}
              placeholder="Введите новое имя пользователя"
            />
            <Button type="submit">Отправить</Button>
          </div>
        </form>

        <form
          onSubmit={(e) => submitHandler(e, "email")}
          className={styles.wrapper}
        >
          <h3 className={styles.head}>Поменять email/login</h3>
          <div className={styles.inputs}>
            <Input
              onChange={(e) => setEmail({ ...email, oldEmail: e.target.value })}
              borderColor="#3f3e3e"
              name="oldEmail"
              value={email.oldEmail}
              placeholder="Введите текущий логин"
            />
            <Input
              onChange={(e) => setEmail({ ...email, newEmail: e.target.value })}
              borderColor="#3f3e3e"
              name="newEmail"
              value={email.newEmail}
              placeholder="Введите новый логин"
            />
            <Button type="submit">Отправить</Button>
          </div>
        </form>

        <form
          onSubmit={(e) => submitHandler(e, "password")}
          className={styles.wrapper}
        >
          <h3 className={styles.head}>Поменять пароль</h3>
          <div className={styles.inputs}>
            <Input
              onChange={(e) =>
                setPassword({ ...password, oldPassword: e.target.value })
              }
              borderColor="#3f3e3e"
              name="oldPassword"
              value={password.oldPassword}
              placeholder="Введите текущий пароль"
            />
            <Input
              onChange={(e) =>
                setPassword({ ...password, newPassword: e.target.value })
              }
              borderColor="#3f3e3e"
              name="newPassword"
              value={password.newPassword}
              placeholder="Введите новый пароль"
            />
            <Button type="submit">Отправить</Button>
          </div>
        </form>
      </div>
    </>
  );
}
