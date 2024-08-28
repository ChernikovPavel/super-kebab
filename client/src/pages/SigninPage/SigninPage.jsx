import AuthForm from '../../components/AuthForm/AuthForm';
import styles from './SigninPage.module.css';

export default function SigninPage({ setUser }) {
  return (
    <div
    style={{
      backgroundImage: "url(/signin.jpg)",
      backgroundSize: "cover",
      backgroundRepeat: "repeat",
      backgroundPosition: "center",
      height: "120vh",
      width: "100vw",
    }}
  >
    <div className={styles.wrapper}>
      <AuthForm title='Войти' type='signin' setUser={setUser} />
    </div>
    </div>
  );
}
