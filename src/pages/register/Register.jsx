import styles from './register.module.css';

const Register = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
    
        console.log('Formulário enviado');
      };
  return (
    <section className={styles.mainContainer}>
      
        <div className={styles.geralContainer}>
        <form onSubmit={handleSubmit}>
        <h3>Cadastre-se</h3>
            <label htmlFor="name"/>
            <input type="text" name='name' id='name' placeholder='Seu nome'/>
            <label htmlFor="last-name"/>
            <input type="text" name='last-name' id='last-name' placeholder='Ultimo nome'/>
            <label htmlFor="email"/>
            <input type="email" name='email' id='email' placeholder='Email'/>
            <label htmlFor="password"/>
            <input type="password" name='password' id='password' placeholder='Senha'/>
            <label htmlFor="phone_number"/>
            <input type="text" name="phone_number" id="phone_number" placeholder='11 99999-9999'/>
            <label htmlFor="security_question"/>
            <select name="security_question" id="security_question" defaultValue="1">
                <option value='1' disabled hidden>Pergunta de segurança</option>
                <option value="">Pergunta 1</option>
                <option value="">Pergunta 2</option>
                <option value="">Pergunta 3</option>
                <option value="">Pergunta 4</option>
            </select>
            <label htmlFor="response"/>
            <input type="text" name='response' id='response' placeholder='Resposta de segurança'/>
            <button type='submit'>Cadastrar</button>
        </form>
        <div className={styles.imageContainer}>
        <img src="\images\background2.png" alt="*" />
        </div>
        </div> 
    </section>
  )
}

export default Register