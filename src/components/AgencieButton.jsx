import './agencieButton.module.css'; 

const AgencieButton = ({ imageSrc }) => {
  return (
    <div className="container">
      <img src={imageSrc} alt='logo' className="image" />
    </div>
  );
}

export default AgencieButton;
