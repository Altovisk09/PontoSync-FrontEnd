import { useContext, useState, useEffect } from 'react';
import { TextField, Button, Typography, Divider } from '@mui/material';
import { UserContext } from '../../context/UserProvider';
import styles from './uprofile.module.css';

const maskName = (name) => {
  if (!name) return '';
  return name[0] + '***' + name[name.length - 1];
};

const maskEmail = (email) => {
  if (!email) return '';
  const [username, domain] = email.split('@');
  const maskedUsername = username[0] + username.slice(1).replace(/./g, '*');
  return maskedUsername + '@' + domain;
};

const maskPhone = (phone) => {
  if (!phone) return '';
  return phone.slice(0, 5) + '***' + phone.slice(-1);
};

const Uprofile = () => {
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: user.name,
    last_name: user.last_name,
    email: user.email,
    phone_number: user.phone_number,
  });

  const [isModified, setIsModified] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    letter: false,
    number: false,
    noSpaces: false,
    match: false,
  });

  useEffect(() => {
    const isChanged =
      formData.name !== user.name ||
      formData.last_name !== user.last_name ||
      formData.email !== user.email ||
      formData.phone_number !== user.phone_number;
    setIsModified(isChanged);
  }, [formData, user]);

  useEffect(() => {
    const length = newPassword.length >= 7;
    const letter = /[a-zA-Z]/.test(newPassword);
    const number = /\d/.test(newPassword);
    const noSpaces = !/\s/.test(newPassword);
    const match = newPassword === confirmPassword;

    setPasswordRequirements({
      length,
      letter,
      number,
      noSpaces,
      match,
    });
  }, [newPassword, confirmPassword]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const allRequirementsMet = Object.values(passwordRequirements).every(Boolean);
  const showRequirements = newPassword || confirmPassword;

  return (
    <section className={styles.mainContainer}>
      <article className={styles.contentMain}>
        <div className={styles.configContainer}>
          <Typography variant="h4">Configurações da conta</Typography>
          <Typography variant="body1">Gerencie os detalhes de sua conta.</Typography>
          <div className={styles.profileImage}>
            <img src="/icons/user.png" alt="User Profile" />
            <div className={styles.overlay}>
              <img src="" alt="" />
            </div>
          </div>
          <div className={styles.infoContainer}>
            <Typography variant="h6">Detalhes pessoais</Typography>
            <Typography variant="body2">Essas informações pessoais são privadas e não serão exibidas para outros usuários.</Typography>
            <form>
              <div>
                <TextField
                  label="Nome"
                  name="name"
                  value={maskName(formData.name)}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  label="Sobrenome"
                  name="last_name"
                  value={maskName(formData.last_name)}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
              </div>
              <Typography variant="h6">Informações para contato</Typography>
              <Typography variant="body2">Esses dados podem ser utilizados para recuperar sua conta em caso de perda.</Typography>
              <div>
                <TextField
                  label="Email"
                  name="email"
                  value={maskEmail(formData.email)}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  label="Telefone"
                  name="phone_number"
                  value={maskPhone(formData.phone_number)}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
              </div>
              <Button
                variant="contained"
                color="primary"
                type="button"
                disabled={!isModified}
                className={isModified ? styles.activeButton : ''}
                fullWidth
              >
                ATUALIZAR DADOS
              </Button>
            </form>
          </div>
        </div>

        <Divider sx={{ margin: '20px 0' }} />

        <div className={styles.passwordSection}>
          <Typography variant="h4">Alterar Senha</Typography>
          <Typography variant="body1">Para sua segurança, recomendamos enfaticamente que escolha uma senha única, que não seja usada para nenhuma outra conta on-line.</Typography>
          <form>
            <TextField label="Senha atual" type="password" fullWidth margin="normal" variant="outlined" />
            <TextField 
              label="Nova senha" 
              type="password" 
              fullWidth 
              margin="normal" 
              variant="outlined" 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <TextField 
              label="Digite a nova senha novamente" 
              type="password" 
              fullWidth 
              margin="normal" 
              variant="outlined" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {showRequirements && (
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li style={{ color: passwordRequirements.length ? 'green' : 'red' }}>
                  {passwordRequirements.length ? '✔️ Use 7 caracteres ou mais' : '❌ Use 7 caracteres ou mais'}
                </li>
                <li style={{ color: passwordRequirements.letter ? 'green' : 'red' }}>
                  {passwordRequirements.letter ? '✔️ Use pelo menos 1 letra' : '❌ Use pelo menos 1 letra'}
                </li>
                <li style={{ color: passwordRequirements.number ? 'green' : 'red' }}>
                  {passwordRequirements.number ? '✔️ Use pelo menos 1 número' : '❌ Use pelo menos 1 número'}
                </li>
                <li style={{ color: passwordRequirements.noSpaces ? 'green' : 'red' }}>
                  {passwordRequirements.noSpaces ? '✔️ Sem espaços' : '❌ Sem espaços'}
                </li>
                <li style={{ color: passwordRequirements.match ? 'green' : 'red' }}>
                  {passwordRequirements.match ? '✔️ As senhas coincidem' : '❌ As senhas não coincidem'}
                </li>
              </ul>
            )}
            <Button 
              variant="contained" 
              color="primary" 
              type="submit" 
              disabled={!allRequirementsMet}
            >
              SALVAR MUDANÇAS
            </Button>
          </form>
        </div>

        <Divider sx={{ margin: '20px 0' }} />

        <div className={styles.securityQuestionSection}>
          <Typography variant="h4">Pergunta de segurança</Typography>
          <Typography variant="body1">Recomendamos que não compartilhe suas informações para sua segurança, essas informações podem ser utilizadas para recuperar sua conta caso seja necessário.</Typography>
          <form>
            <TextField label="Pergunta de segurança" fullWidth margin="normal" variant="outlined" />
            <Button variant="contained" color="primary" type="submit">
              SALVAR MUDANÇAS
            </Button>
          </form>
        </div>
        
        <div className={styles.userDelete}>
          <Typography variant="h4">Excluir conta</Typography>
          <Typography variant="body2">Clique em SOLICITAR EXCLUSÃO DE CONTA para iniciar o processo de exclusão permanente da sua conta.</Typography>
          <Button
            variant="contained"
            fullWidth
            sx={{ backgroundColor: 'red', '&:hover': { backgroundColor: 'darkred' } }}
          >
            SOLICITAR EXCLUSÃO DE CONTA
          </Button>
        </div>
      </article>
    </section>
  );
};

export default Uprofile;
