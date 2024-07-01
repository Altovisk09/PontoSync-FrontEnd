import { Outlet } from 'react-router-dom';
// import Navbar from '../components/Navbar'; 
// import Footer from '../components/Footer'; 

const MainLayout = () => {
  return (
    <div className='app'>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
