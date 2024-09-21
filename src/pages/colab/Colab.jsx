import styles from './colab.module.css';
import { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../context/UserProvider';

const EmployeeTable = () => {
  const { employees, setSelectedEmployee } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const imageName = location.state.imageName

  const minRows = 13;
  const emptyRows = minRows - employees.length;

  const handleViewClick = async(employeeId) => { 
    console.log('Fetching employee ID:', employeeId);  
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/api/employees/${employeeId}`, {
        method: "GET",
        credentials: "include"
      });

      if (response.ok) {
        const dataEmployee = await response.json(); 
        console.log('Employee data:', dataEmployee);  
        setSelectedEmployee(dataEmployee);
        navigate(`/employee/${employeeId}`); 
      } else {
        console.log('Error fetching employee:', response.statusText);  
      }

    } catch(error) {
      console.log('Algo deu errado', error);
    }
  };

  return (
    <section className={styles.mainContainer}>
      <img src={`/images/${imageName}`} alt="Agencia"/>
      <div className={styles.filterInfo}>
        <p>Total de funcionarios: {employees.length}</p>
        <div>
          <p>Filtro</p>
          <img src="/icons/filter.png" alt="Filtro" />
        </div>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Colaboradores</th>
              <th>Matrícula</th>
              <th>Saldo BH</th>
              <th>Data Atualizada</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}> 
                <td>{employee.nome}</td>
                <td>{employee.id}</td>
                <td>{employee.bancoHoras}</td>
                <td>{employee.dataEmissao}</td>
                <td>
                  <button onClick={() => handleViewClick(employee.id)}>Visualizar</button>
                  <button onClick={() => handleViewClick(employee.id)}>Excluir</button>
                </td>
              </tr>
            ))}

            {Array.from({ length: emptyRows > 0 ? emptyRows : 0 }).map((_, index) => (
              <tr key={`empty-${index}`} className={styles.emptyRow}>
                <td colSpan="5">&nbsp;</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default EmployeeTable;
