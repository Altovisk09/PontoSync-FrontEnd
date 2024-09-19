import React, { useState } from 'react';
import './calendar.css';

const Calendar = ({ currentMonth, currentYear, selectedDate, onDayClick, onMonthChange }) => {
  const daysOfWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  
  const [isHiding, setIsHiding] = useState(false); // Estado para controlar a animação

  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDayOfMonth = getFirstDayOfMonth(currentMonth, currentYear);
  const emptyDays = Array(firstDayOfMonth).fill(null);

  const handleDayClick = (day) => {
    setIsHiding(true); // Inicia a animação de ocultação

    setTimeout(() => {
      onDayClick(day); // Chama a função de clique após a animação
      setIsHiding(false); // Finaliza a animação
    }, 200); // Tempo deve corresponder à duração da animação CSS
  };

  return (
    <div className="main-calendar-container">
      <div className="calendar-container">
        <div className="calendar-header">
          <button onClick={() => onMonthChange(-1)}>&lt;</button>
          <span>
            {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}
          </span>
          <button onClick={() => onMonthChange(1)}>&gt;</button>
        </div>

        <div className="calendar-days-of-week">
          {daysOfWeek.map((day, index) => (
            <div key={index} className="calendar-day-name">
              {day}
            </div>
          ))}
        </div>

        <div className="calendar-days">
          {emptyDays.map((_, index) => (
            <div key={index} className="calendar-day empty"></div>
          ))}
          {Array.from({ length: daysInMonth }, (_, i) => (
            <div
              key={i}
              className={`calendar-day ${selectedDate.getDate() === i + 1 && currentMonth === selectedDate.getMonth() && currentYear === selectedDate.getFullYear() ? 'selected' : ''} ${isHiding ? 'hide' : ''}`}
              onClick={() => handleDayClick(i + 1)}
              data-day={i + 1}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
