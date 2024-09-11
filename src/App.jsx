import './App.css';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import { auth } from './config/firebase';
import { UserProvider } from './context/UserProvider';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import Login from '../src/pages/login/Login';
import Register from '../src/pages/register/Register';
import Agencies from './pages/agencies/Agencies';
import Employee from './pages/colab/Colab';
import ProtectedRoute from './components/ProtectedRoute'; // Adicione o caminho correto
import PublicRoute from './components/PublicRoute'; // Adicione o caminho correto

function App() {
  return (
    <UserProvider>
      <div className='app'>
        <BrowserRouter>
          <Routes>

            <Route element={<MainLayout />}>
              <Route path="/" element={<Login auth={auth} />} />
              <Route path="/register" element={<Register />} />
            </Route>

            <Route element={<AuthLayout />}>
              <Route path="/agencies" element={<Agencies />} />
              <Route path="/agencie/:agencie" element={<Employee />} />
            </Route>

          </Routes>
        </BrowserRouter>
      </div>
    </UserProvider>
  );
}

export default App;
