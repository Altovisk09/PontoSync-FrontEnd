import styles from './authLayout.module.css'
import { Outlet } from 'react-router-dom';
import Menu from '../components/Menu';

const AuthLayout = () => {
  return (
    <div className={styles.app}>
<aside>
    <Menu/>
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
