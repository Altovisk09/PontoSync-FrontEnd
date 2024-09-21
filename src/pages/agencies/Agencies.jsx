import { useNavigate } from 'react-router-dom';
import styles from './agencies.module.css';
import AgencieButton from "../../components/AgencieButton";

const Agencies = () => {
  const navigate = useNavigate();

  const handleAgencyClick = (agencyId, imageName) => {
    navigate(`/reports/${agencyId}`, { state: { imageName } }); 
  };

  return (
    <section>
      <div className={styles.mainContainer}>
        <h1>Relatorio de correção de ponto</h1>
        <div className={styles.agencies}>
          <a onClick={() => handleAgencyClick('randstad', 'rand.png')}>
            <AgencieButton imageSrc={"/images/rand.png"} />
          </a>
          <a onClick={() => handleAgencyClick('manpower', 'manp.png')}>
            <AgencieButton imageSrc={"/images/manp.png"} />
          </a>
          <a onClick={() => handleAgencyClick('addeco', 'adde.png')}>
            <AgencieButton imageSrc={"/images/adde.png"} />
          </a>
          <a onClick={() => handleAgencyClick('rhadarrh', 'rhad.png')}>
            <AgencieButton imageSrc={"/images/rhad.png"} />
          </a>
          <a onClick={() => handleAgencyClick('4t', '4t.png')}>
            <AgencieButton imageSrc={"/images/4t.png"} />
          </a>
          <a onClick={() => handleAgencyClick('valorrh', 'valo.png')}>
            <AgencieButton imageSrc={"/images/valo.png"} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Agencies;
