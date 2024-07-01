import './agencieButton.module.css'; 

const AgencieButton = ({ imageSrc, name }) => {
  return (
    <div className="container">
      <img src={imageSrc} alt='logo' className="image" />
      <p className="name">{name}</p>
    </div>
  );
}

export default AgencieButton;
