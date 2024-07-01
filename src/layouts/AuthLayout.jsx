import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className='app'>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
