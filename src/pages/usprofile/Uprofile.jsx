import styles from './uprofile.module.css';
import { useContext } from 'react';
import { UserContext } from '../../context/UserProvider';
const Uprofile = () => {
  const { user, setUser, employees } = useContext(UserContext);

  return (
    <section className={styles.mainContainer}>
      <h2>Meu perfil</h2>
      <div className={styles.userInfoContainer}>
      <img src="/icons/user.png" alt="tes" />
      <div className={styles.infoContainer}>
        <p>Informações do usuario:</p>
        <h2>{user.name} {user.last_name}</h2>
        <p>{user.email}</p>
        <p>{user.phone_number}</p>
        <p>{user.security_question}</p>
        <p>{user.response}</p>
      </div>
     <p>Configurações:</p>
    <p>Modo escuro:</p>
    <input type="checkbox" name="" id="" />
      </div>
      <div className={styles.configContainer}>

      </div>
    </section>
  )
}

export default Uprofile