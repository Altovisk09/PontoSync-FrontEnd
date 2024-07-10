import React, { useState, useContext } from 'react';
import { UserContext } from './UserContext';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import './login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const auth = getAuth();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();

      const response = await fetch('/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      });

      if (!response.ok) {
        throw new Error('Erro ao autenticar usuário');
      }

      const data = await response.json();
      console.log('Usuário autenticado com sucesso:', data);

      // Salvar dados do usuário no contexto
      setUser(data.userData);

    } catch (error) {
      console.error(error);
    }
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
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Entrar</button>
          </form>
          <p><a href="/forgot-password">Esqueci minha senha</a></p>
          <p>Ainda não possui cadastro? <a href="/register">Clique aqui e crie sua conta!</a></p>
        </div>
      </div>
    </section>
  );
};

export default Login;
