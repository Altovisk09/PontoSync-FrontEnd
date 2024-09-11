import styles from './colab.module.css';
import { useContext } from 'react';
import { UserContext } from '../../context/UserProvider'; 

const EmployeeTable = () => {
  const { employees } = useContext(UserContext); 

  const minRows = 10;
  const emptyRows = minRows - employees.length;

  return (
    <section className={styles.mainContainer}>
      <img src="/images/rand.png" alt="Randstad"/>
      <div className={styles.filterInfo}>
    <p>Total de funcionarios: {employees.length}</p>
    <div>
    <p>Filtro</p>
    <img src="/icons/filter.png" alt="Filtro" />
    </div>
      </div>
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
          {employees.map((employee, index) => (
            <tr key={employee.id}> 
              <td>{employee.nome}</td>
              <td>{employee.id}</td>
              <td>{employee.bancoHoras}</td>
              <td>{employee.dataEmissao}</td>
              <td>
                <button>Visualizar</button>
                <button>Editar</button>
                <button>Excluir</button>
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
    </section>
  );
};

export default EmployeeTable;
