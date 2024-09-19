import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Importa o CSS padrão
import './customCalendar.css'
const SimpleCalendar = ({ onDateChange }) => {
  const [date, setDate] = useState(new Date());
  const [viewDate, setViewDate] = useState(date);

  const handleDateChange = (newDate) => {
    setDate(newDate);
    if (onDateChange) onDateChange(newDate);
  };

  const handleMonthChange = (offset) => {
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + offset);
    setViewDate(newDate);
  };

  const currentMonthName = viewDate.toLocaleString('default', { month: 'long' });
  const currentYear = viewDate.getFullYear();

  return (
    <div>
      <Calendar
        onChange={handleDateChange}
        value={date}
        view='month'
        showNeighboringMonth
        showFixedNumberOfWeeks
      />
    </div>
  );
};

export default SimpleCalendar;
