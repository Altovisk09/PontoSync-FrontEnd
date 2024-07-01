import "./colab.module.css"

const ColabRow = ({ name, matricule, agency, hours, lastUpdate, status }) => {
  return (
    <tr>
        <td>{name}</td>
        <td>{matricule}</td>
        <td>{agency}</td>
        <td>{hours}</td>
        <td>{lastUpdate}</td>
        <td>{status}</td>
        <td>
            <button>Delete</button>
            <button>View</button>
        </td>
    </tr>
  )
}

export default ColabRow

