import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className='app'>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
