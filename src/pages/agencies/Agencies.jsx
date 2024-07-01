import './agencies.module.css';

import AgencieButton from "../../components/AgencieButton";

const Agencies = () => {
  return (
    <section>
        <div className='main-container'>
            <h2>Controle de ponto</h2>
            <div className='agencies'>
            <AgencieButton imageSrc="path/to/image1.jpg" name="Geral"/>
            <AgencieButton imageSrc="path/to/image1.jpg" name="Randstad"/>
            <AgencieButton imageSrc="path/to/image1.jpg" name="Rhadar"/>
            <AgencieButton imageSrc="path/to/image1.jpg" name="Man Power"/>
            <AgencieButton imageSrc="path/to/image1.jpg" name="Addeco"/>
            <AgencieButton imageSrc="path/to/image1.jpg" name="ValorRH"/>
            </div>
        </div>
    </section>
  )
}

export default Agencies