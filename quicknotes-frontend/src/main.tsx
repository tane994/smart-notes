import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Edit from './pages/Edit.tsx';
import Register from './pages/Register.tsx';
import Login from './pages/Login.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.tsx'
import { AuthProvider } from './context/AuthProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route element={<AuthProvider />}>
          <Route element={<Layout />}>
            <Route path='/' element={<App />} />
            <Route path='/edit/:id' element={<Edit />} />
            <Route path='/edit' element={<Edit />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)