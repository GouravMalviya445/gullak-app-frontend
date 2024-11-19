import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { SigninPage, SignupPage, SendPage, DashBoardPage, Account } from "./pages/index.js";
import { config } from './config/config.js';
import Home from './pages/Home.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes >
        <Route path='/'>
          <Route path='' element={<Home/>} />
          <Route index path='signup' element={<SignupPage />} />
          <Route path='signin' element={<SigninPage />} />
          <Route path='send' element={<SendPage />} />
          <Route path='dashboard' element={<DashBoardPage />} />
          <Route path='profile' element={<Account />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
