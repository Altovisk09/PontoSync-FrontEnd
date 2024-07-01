import './login.module.css';

import React from 'react';

const Login = () => {

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log('Formulário enviado');
  };
  return (
    <section>
      <div className='main-container'>
        <div className='image-container'>
          <img src="*" alt="Imagem de boas-vindas" />
        </div>
        <div className='form-container'>
          <h2>Bem Vindo(a)!</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username"/>
            <input type="text" name="username" id="username" required />

            <p><a href="/forgot-password">Esqueci minha senha</a></p>

            <label htmlFor="password"/>
            <input type="password" name="password" id="password" required />

            <button type="submit">Entrar</button>
          </form>
          <p>
            Ainda não possui cadastro?<br />
            <a href="/register">Clique aqui e crie sua conta!</a>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Login