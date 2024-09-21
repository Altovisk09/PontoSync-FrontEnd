import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserProvider';
import { auth } from './config/firebase';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import AuthLayout2 from './layouts/AuthLayout2';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Agencies from './pages/agencies/Agencies';
import Employees from './pages/colab/Colab';
import EmployeeProfile from './pages/emprofile/Eprofile';
import UserProfile from './pages/usprofile/Uprofile';
import Help from './pages/help/Help';
import Statistics from './pages/statistics/Statistic'
import Reports from './pages/reports/Reports';
import ProtectedRoute from './hooks/ProtectedRoute';
import PublicRoute from './hooks/PublicRoute';

function App() {
  return (
    <UserProvider>
      <div className='app'>
        <BrowserRouter>
          <Routes>
            {/* Rotas Públicas */}
            <Route element={<PublicRoute element={<MainLayout />} />}>
              <Route path="/" element={<Login auth={auth} />} />
              <Route path="/register" element={<Register />} />
            </Route>

            {/* Rotas Protegidas */}
            <Route element={<ProtectedRoute element={<AuthLayout />} />}>
              <Route path="/employees/:agencie" element={<Employees />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/employee/:employeeId" element={<EmployeeProfile />} />
              <Route path="/profile" element={<UserProfile/>}/>
              <Route path="/help" element={<Help/>}/>
              <Route path="/statistics" element={<Statistics />}/>
              <Route path="/reports/:agencie" element={< Reports/>}/>
            </Route>

            <Route element={<ProtectedRoute element={<AuthLayout2 />} />}>
              <Route path="/reports" element={<Agencies />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </UserProvider>
  );
}

export default App;
