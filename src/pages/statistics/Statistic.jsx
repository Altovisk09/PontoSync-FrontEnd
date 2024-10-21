import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import styles from './statistics.module.css';
import mockData from './mockEmployees.json'; // Importe o arquivo JSON gerado

import { Chart as ChartJS } from 'chart.js/auto'; 

const AttendanceChart = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [absenceData, setAbsenceData] = useState({});
    const [absenceDetails, setAbsenceDetails] = useState({});

    const processAbsenceData = (data) => {
        const absenceMap = {};
        const absenceDetailMap = {};

        data.employees.forEach(employee => {
            employee.timeEntries.forEach(entry => {
                if (entry.motive === 'falta') {
                    const date = entry.date;
                    if (absenceMap[date]) {
                        absenceMap[date] += 1;
                        absenceDetailMap[date].push(employee.id);
                    } else {
                        absenceMap[date] = 1;
                        absenceDetailMap[date] = [employee.id];
                    }
                }
            });
        });

        return { absenceMap, absenceDetailMap };
    };

    useEffect(() => {
        const { absenceMap, absenceDetailMap } = processAbsenceData(mockData);
        setAbsenceData(absenceMap);
        setAbsenceDetails(absenceDetailMap);
    }, []);

    const getDataForMonth = (monthOffset = 0) => {
        const month = currentDate.getMonth() + 1 + monthOffset;
        const year = currentDate.getFullYear();
        const daysInMonth = new Date(year, month, 0).getDate();

        const labels = Array.from({ length: daysInMonth }, (_, i) => i + 1);
        const data = labels.map(day => {
            const dateKey = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            return absenceData[dateKey] || 0;
        });

        const totalAbsences = data.reduce((sum, value) => sum + value, 0);

        return { labels, data, totalAbsences };
    };

    const handleMonthChange = (direction) => {
        const newDate = new Date(currentDate.setMonth(currentDate.getMonth() + direction));
        setCurrentDate(newDate);
    };

    const { labels, data, totalAbsences } = getDataForMonth();
    const { totalAbsences: totalAbsencesPreviousMonth } = getDataForMonth(-1);

    const percentageChange = totalAbsencesPreviousMonth > 0
        ? ((totalAbsences - totalAbsencesPreviousMonth) / totalAbsencesPreviousMonth) * 100
        : null;

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Attendance Chart</h1>
                <div className={styles.nav}>
                    <button onClick={() => handleMonthChange(-1)} className={styles.arrowButton}>⬅</button>
                    <p>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
                    <button onClick={() => handleMonthChange(1)} className={styles.arrowButton}>⬅</button>
                </div>
            </header>

            <section className={styles.infoSection}>
                <div className={styles.infoBox}>
                    <h3>Faltas Totais</h3>
                    <p>{totalAbsences}</p>
                </div>
                <div className={styles.infoBox}>
                    <h3>Absenteismo Geral</h3>
                    {percentageChange !== null ? (
                        <p>{percentageChange > 0 ? `vs mês passado +${percentageChange.toFixed(2)}%` : `vs mês passado ${percentageChange.toFixed(2)}%`}</p>
                    ) : (
                        <p>No data for previous month</p>
                    )}
                </div>
            </section>

            <div className={styles.chartWrapper}>
                <Bar 
                    data={{
                        labels: labels,
                        datasets: [
                            {
                                label: 'Faltas',
                                data: data,
                                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                            }
                        ]
                    }}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true,
                                max: Math.max(...data) + 2, // Espaço extra no eixo Y
                                ticks: {
                                    stepSize: 1
                                }
                            }
                        },
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: function(tooltipItem) {
                                        const day = tooltipItem.label;
                                        const month = currentDate.getMonth() + 1;
                                        const year = currentDate.getFullYear();
                                        const dateKey = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                                        const ids = absenceDetails[dateKey] || [];
                                        if (ids.length > 0) {
                                            return `Absences: ${tooltipItem.raw}, IDs: ${ids.join(', ')}`;
                                        }
                                        return `Absences: ${tooltipItem.raw}`;
                                    }
                                }
                            }
                        }
                    }}
                    height={300} 
                />
            </div>
        </div>
    );
};

export default AttendanceChart;
