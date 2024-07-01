import './colab.module.css';

import ColabRow from '../../components/ColabRow';


const EmployeeTable = () => {
  const employees = [
    { name: "Maria Silva", matricule: "123", agency: "TI", hours: "40", lastUpdate: "01/07/2024", status: "Active" },
    { name: "João Souza", matricule: "456", agency: "HR", hours: "35", lastUpdate: "02/07/2024", status: "Active" },
    { name: "Ana Costa", matricule: "789", agency: "TI", hours: "38", lastUpdate: "03/07/2024", status: "Inactive" }
  ];

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Matricule</th>
          <th>Agency</th>
          <th>Hours</th>
          <th>Last Update</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee, index) => (
          <ColabRow 
            key={index}
            name={employee.name}
            matricule={employee.matricule}
            agency={employee.agency}
            hours={employee.hours}
            lastUpdate={employee.lastUpdate}
            status={employee.status}
          />
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
