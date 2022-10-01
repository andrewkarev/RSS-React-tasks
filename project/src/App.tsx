import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import AboutPage from './pages/about-page/AboutPage';
import MainPage from 'pages/main-page/MainPage';
import NotFoundPage from 'pages/not-found-page/NotFoundPage';
import Layout from 'components/Layout';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="main" replace />} />
            <Route path="main" element={<MainPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="404" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
