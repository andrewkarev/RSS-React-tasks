import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import AboutPage from './pages/AboutPage';
import MainPage from 'pages/MainPage';
import NotFoundPage from 'pages/NotFoundPage';
import Layout from 'components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="404" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
