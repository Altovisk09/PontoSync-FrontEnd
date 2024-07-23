import './App.css'
import { auth } from './config/firebase';

import { UserProvider } from './context/UserProvider';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Login from '../src/pages/login/Login';
import Register from '../src/pages/register/Register';
import Agencies from './pages/agencies/Agencies';
import Employee from './pages/colab/Colab';

function App() {
  return (
    
    <UserProvider>
    <div className='app'>
       <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
        <Route path="/" element={<Register />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login auth={auth} />} />
          <Route path="/register" element={<Register />} />
          <Route path='/agencies' element={<Agencies/>}/>
          <Route path='/employees' element={<Employee/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
    </UserProvider>
  )
}

export default App
