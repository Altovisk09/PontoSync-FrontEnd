import styles from './menu.module.css';
import 'flag-icons/css/flag-icons.min.css'; 

import askIcon from '/icons/ask.png';
import clockIcon from '/icons/clock.png';
import configIcon from '/icons/config.png';
import graphicIcon from '/icons/graphic.png';
import personCircleIcon from '/icons/personCircle.png';
import reportIcon from '/icons/report.png';
import exitIcon from '/icons/exit.png'; 

const Menu = () => {
  return (
    <nav className={styles.menu}> 
        <div className={styles.language}>
            <span className="fi fi-br"></span> 
            <span className="fi fi-es"></span> 
        </div>
        <div className={styles.options}>
            <span className={styles.optionItem}>
                <img src={personCircleIcon} alt="Person" className={styles.optionImage} />
                <span>Person</span>
            </span>
            <span className={styles.optionItem}>
                <img src={clockIcon} alt="Clock" className={styles.optionImage} />
                <span>Clock</span>
            </span> 
            <span className={styles.optionItem}>
                <img src={reportIcon} alt="Report" className={styles.optionImage} />
                <span>Report</span>
            </span>
            <span className={styles.optionItem}>
                <img src={graphicIcon} alt="Graphic" className={styles.optionImage} />
                <span>Graphic</span>
            </span>
            <span className={styles.optionItem}>
                <img src={askIcon} alt="Ask" className={styles.optionImage} />
                <span>Ask</span>
            </span> 
            <span className={styles.optionItem}>
                <img src={configIcon} alt="Config" className={styles.optionImage} />
                <span>Config</span>
            </span>
        </div>
        <div className={styles.exit}>
            <span className={styles.exitIcon}>
                <img src={exitIcon} alt="Exit" className={styles.exitImage} />
            </span>
        </div> 
    </nav>
  );
}

export default Menu;
