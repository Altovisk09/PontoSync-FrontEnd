import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/UserProvider';
import styles from "./eprofile.module.css";
import Calendar from "../../components/Calendar";

const EmployeeProfile = () => {
  const { selectedEmployee } = useContext(UserContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [dayInfo, setDayInfo] = useState(null);
  const [isHiding, setIsHiding] = useState(false); // Estado para animação

  const dayNames = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
  const dayOfWeek = (selectedDate.getDay() + 6) % 7;

  if (!selectedEmployee) return <div>Carregando...</div>;

  const handleDayClick = (day) => {
    setIsHiding(true);

    setTimeout(() => {
      setSelectedDate(new Date(currentYear, currentMonth, day));
      loadDayInfo(day); // Passa o dia selecionado
      setIsHiding(false);
    }, 250);
  };

  const changeMonth = (direction) => {
    const newDate = new Date(currentYear, currentMonth + direction);
    setCurrentMonth(newDate.getMonth());
    setCurrentYear(newDate.getFullYear());
    setSelectedDate(new Date(newDate.getFullYear(), newDate.getMonth(), 1));
    loadDayInfo(1); // Carrega info para o primeiro dia do novo mês
  };

  const changeDay = (direction) => {
    setIsHiding(true);

    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + direction);
    setTimeout(() => {
      setSelectedDate(newDate);
      setCurrentMonth(newDate.getMonth());
      setCurrentYear(newDate.getFullYear());
      loadDayInfo(newDate.getDate()); // Carrega info para o novo dia
      setIsHiding(false);
    }, 250);
  };

  const loadDayInfo = (day) => {
    const dateString = new Date(currentYear, currentMonth, day).toLocaleDateString('pt-BR');
    const infoForSelectedDay = selectedEmployee.timeEntries.find(entry => entry.date === dateString);
    setDayInfo(infoForSelectedDay || { date: dateString, day: dayNames[new Date(currentYear, currentMonth, day).getDay()] });
  };

  // Separar a marcação em entrada e saída
  const getMarkingInfo = (marcacao) => {
    if (!marcacao) return { entrada: 'N/A', saida: 'N/A' };
    const [entrada, saida] = marcacao.split(' | ');
    return { entrada: entrada || 'N/A', saida: saida || 'N/A' };
  };

  return (
    <section className={styles.mainContainer}>
      <div className={styles.employeeInfo}>
        <p>{selectedEmployee.nome}</p>
        <img src="/icons/user.png" alt="" />
        <p>{selectedEmployee.cargo}</p>
        <p>Cad: {selectedEmployee.departamento}</p>
        <p>Agência: {selectedEmployee.agencie}</p>
        <div className={styles.extrainfo}>
          <p>Data de admissão: {selectedEmployee.admissao}</p>
          <p>Última atualização: {selectedEmployee.dataEmissao}</p>
          <p>Matrícula: 001001229948</p>
          <p>Banco de horas Total: {selectedEmployee.bancoHoras || 'N/A'}</p>
        </div>
      </div>
      <div className={styles.pontoContainer}>
        <div>
          <Calendar
            currentMonth={currentMonth}
            currentYear={currentYear}
            selectedDate={selectedDate}
            onDayClick={handleDayClick}
            onMonthChange={changeMonth}
          />
        </div>
        <div className={styles.infoCalendar}>
          <div className={styles.daySelectedContainer}>
            <div className={styles.arrowL} onClick={() => changeDay(-1)}>
              <p>{'<'}</p>
            </div>
            <div className={styles.dayNameContainer}>
              <p className={`${styles.dayName} ${isHiding ? styles.hide : ''}`}>{dayNames[dayOfWeek]}</p>
              <p className={`${styles.dayNumber} ${isHiding ? styles.hide : ''}`}>{selectedDate.getDate()}</p>
            </div>
            <div className={styles.arrowR} onClick={() => changeDay(1)}>
              <p>{'>'}</p>
            </div>
          </div>
          <div className={styles.timeEntries}>
            <span>{getMarkingInfo(dayInfo?.marcacao)?.entrada || 'N/A'}</span>
            {dayInfo?.marcacao ? (
              <>
                <span>01:00</span>
                <span>02:00</span>
              </>
            ) : null}
            <span>{getMarkingInfo(dayInfo?.marcacao)?.saida || 'N/A'}</span>
          </div>

          <div className={styles.timeEntriesInfo}>
            {dayInfo?.workedHours && (
              <p>Horas Trabalhadas: {dayInfo.workedHours}</p>
            )}
            {dayInfo?.additionalNight && (
              <p>Adicional noturno: {dayInfo.additionalNight}</p>
            )}
            {dayInfo?.compensation && (
              <p>Banco de horas: {dayInfo.compensation}</p>
            )}
            {dayInfo?.compensation100 && (
              <p>Banco de horas 100%: {dayInfo.compensation100}</p>
            )}
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
