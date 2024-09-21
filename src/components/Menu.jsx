import styles from './menu.module.css';
import 'flag-icons/css/flag-icons.min.css';
import { useNavigate } from 'react-router-dom';
import { useContext } from "react"
import askIcon from '/icons/ask.png';
import clockIcon from '/icons/clock.png';
import graphicIcon from '/icons/graphic.png';
import personCircleIcon from '/icons/personCircle.png';
import reportIcon from '/icons/report.png';
import exitIcon from '/icons/exit.png';
import { UserContext } from '../context/UserProvider';


const Menu = () => {
  const navigate = useNavigate();
  const { user, resetUserContext } = useContext(UserContext);
  const getGreeting = () => {
    const hour = new Date().getHours();


    if (hour < 12) return `Bom dia, ${user.name}`;
    if (hour < 18) return `Boa tarde, ${user.name}`;
    return `Boa noite, ${user.name}`;
  };
  const handleClick = (path) => {
    navigate(`/${path}`)
  };
  const handleLogout = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/logout`, { method: 'POST', credentials: 'include' });
      if (response.ok) {
        resetUserContext();
        setTimeout(() => {
          navigate('/')
        }, 500)
      } else {
        console.error('Erro ao fazer logout');
      }
    } catch (error) {
      console.error('Erro ao fazer logout', error);
    }
  };

  return (
    <nav className={styles.menu}>
      <div className={styles.language}>
        <span className="fi fi-br"></span>
        <span className="fi fi-es"></span>
      </div>
      <div onClick={() => { handleClick("profile") }} className={styles.user}>
        <img src={personCircleIcon} alt="Person" />
        <div className={styles.greeting}>{getGreeting()}</div>
      </div>
      <div className={styles.options}>
        <span onClick={() => { handleClick("employees") }} className={styles.optionItem}>
          <img src={clockIcon} alt="Clock" className={styles.optionImage} />
          <span>Folha de ponto</span>
        </span>
        <span onClick={() => { handleClick("reports") }} className={styles.optionItem}>
          <img src={reportIcon} alt="Report" className={styles.optionImage} />
          <span>Relatórios</span>
        </span>
        <span onClick={() => { handleClick("statistics") }} className={styles.optionItem}>
          <img src={graphicIcon} alt="Graphic" className={styles.optionImage} />
          <span>Estatísticas</span>
        </span>
        <span onClick={() => { handleClick("help") }} className={styles.optionItem}>
          <img src={askIcon} alt="Ask" className={styles.optionImage} />
          <span>Ajuda</span>
        </span>
      </div>
      <div className={styles.exit}>
        <span onClick={handleLogout} className={styles.optionItem}>
          <img src={exitIcon} alt="Exit" className={styles.optionImage} />
        </span>
      </div>
    </nav>
  );
}

export default Menu;
