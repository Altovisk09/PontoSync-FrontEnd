import { useContext } from "react";
import { UserContext } from '../../context/UserProvider';
import styles from "./eprofile.module.css";

const EmployeeProfile = () => {
  const { selectedEmployee } = useContext(UserContext);
  console.log(selectedEmployee)

  if (!selectedEmployee) return <div>Carregando...</div>;

  return (
    <section className={styles.mainContainer}>
      <div className={styles.employeeInfo}>
        <p>{selectedEmployee.nome}</p>
        <img src="/icons/user.png" alt="" />
        <p>{selectedEmployee.cargo}</p>
        <p>Cad: {selectedEmployee.departamento}</p>
        <p>Agencia:{selectedEmployee.agencie}</p>
       <div className={styles.extrainfo}>
       <p>Data de admissão: {selectedEmployee.admissao}</p>
        <p>Ultima atualização: {selectedEmployee.dataEmissao}</p>
        <p>Matricula: 001001229948</p>
       </div>
      </div>
      <div className={styles.pontoContainer}>
        <div>
          p
        </div>
        <div className={styles.infoCalendar}>
          <div className={styles.daySelectedContainer}>
            <div className={styles.arrowL}>
              <p>{'<'}</p>
            </div>
            <div className={styles.dayNameContainer}>
              <p>Sexta</p>
              <p>13</p>
            </div>
            <div className={styles.arrowR}>
                <p>{'>'}</p>
            </div>
          </div>
          <div className={styles.timeEntries}>
            <span>00:00</span>
            <span>00:00</span>
            <span>00:00</span>
            <span>00:00</span>
          </div>
          <div className={styles.timeEntriesInfo}>
           <p>Banco de horas: {selectedEmployee.bancoHoras}</p>
            <p>He: {selectedEmployee.extra}</p>
            <p>He 100%: {selectedEmployee.extra100}</p>
            <p>Horas totais trabalhadas:  {selectedEmployee.totalWorkedHours}</p> 
            </div>
            <div className={styles.solicitationsContainer}>
              <p>Alterações/Solicitações</p>
            </div>
        </div>
            
        
      </div>
    </section>
  );
};

export default EmployeeProfile;
