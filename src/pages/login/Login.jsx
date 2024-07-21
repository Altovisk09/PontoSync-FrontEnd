import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/UserProvider';
import { auth } from '../../firebase/firebase'; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import './login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();

      const response = await fetch('https://ponto-sync-back-end.vercel.app/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken, rememberMe }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Erro ao autenticar usuário');
      }

      const data = await response.json();
      setUser(data.userData);

    } catch (error) {
      console.error(error);
      setError('Erro ao autenticar usuário');
    }
  };

  return (
    <section>
      <div className='main-container'>
        <div className='image-container'>
          <img src="*" alt="Imagem de boas-vindas" />
        </div>
        <div className='form-container'>
          {user ? (
            <div>
              <h2>Bem-vindo, {user.name} {user.last_name}!</h2>
              <p>Email: {user.email}</p>
              <p>Telefone: {user.phone_number}</p>
              <p>Pergunta de segurança: {user.security_question}</p>
              <p>Resposta de segurança: {user.response}</p>
            </div>
          ) : (
            <>
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
                <label htmlFor="rememberMe">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  Mantenha-me conectado
                </label>
                <button type="submit">Entrar</button>
              </form>
              {error && <p>{error}</p>}
              <p><a href="/forgot-password">Esqueci minha senha</a></p>
              <p>Ainda não possui cadastro? <a href="/register">Clique aqui e crie sua conta!</a></p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Login;
