import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/UserProvider';
import { signInWithEmailAndPassword } from 'firebase/auth';
import styles from './login.module.css';

const Login = ({auth}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { user, setUser, employees} = useContext(UserContext);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await userCredential.user.getIdToken();
console.log(idToken)
        const response = await fetch(`${import.meta.env.VITE_URL}/auth`, {
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
    <section className={styles.mainContainer}>
      <div className={styles.formContainer}>
        <div className={styles.imageContainer}>
          { <img src="/images/logoMeli.png" alt="Imagem de boas-vindas" /> }
        </div>
        <div className={styles.formSubContainer}> 
              <h3>Bem Vindo(a)!</h3>
              <form onSubmit={handleSubmit}>
                <label htmlFor="email"></label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder='Digite seu email'
                />
                <label htmlFor="password"></label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder='Senha'
                />
                <div className={styles.teste}>
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
              </div>
                <button type="submit">Entrar</button>
              </form>
              {error && <p>{error}</p>}
              <p>Ainda não possui cadastro? <br /><a href="/register">Clique aqui e crie sua conta!</a></p>
        </div>
      </div>
    </section>
  );
};

export default Login;
