import styles from './authLayout2.module.css'
import { Outlet } from 'react-router-dom';
import Menu from '../components/Menu2';

const AuthLayout = () => {
  return (
    <div className={styles.app}>
<footer>
    <Menu/>
      </footer>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
