import { useNavigate } from 'react-router-dom';
import styles from './agencies.module.css';
import AgencieButton from "../../components/AgencieButton";
import Menu from "../../components/Menu2";

const Agencies = () => {
  const navigate = useNavigate();

  const handleAgencyClick = (agencyId) => {
    navigate(`/agencie/${agencyId}`);
  };

  return (
    <section>
      <div className={styles.mainContainer}>
        <h1>Controle de ponto</h1>
        <div className={styles.agencies}>
          <a onClick={() => handleAgencyClick('randstad')}>
            <AgencieButton imageSrc={"/images/rand.png"} />
          </a>
          <a onClick={() => handleAgencyClick('manpower')}>
            <AgencieButton imageSrc={"/images/manp.png"} />
          </a>
          <a onClick={() => handleAgencyClick('addeco')}>
            <AgencieButton imageSrc={"/images/adde.png"} />
          </a>
          <a onClick={() => handleAgencyClick('rhadarrh')}>
            <AgencieButton imageSrc={"/images/rhad.png"} />
          </a>
          <a onClick={() => handleAgencyClick('4t')}>
            <AgencieButton imageSrc={"/images/4t.png"} />
          </a>
          <a onClick={() => handleAgencyClick('valorrh')}>
            <AgencieButton imageSrc={"/images/valo.png"} />
          </a>
        </div>
      </div>
    </section>
  )
}

export default Agencies;
