import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import AboutPage from './pages/about-page';
import MainPage from 'pages/main-page';
import NotFoundPage from 'pages/not-found-page';
import Layout from 'components';
import FormPage from 'pages/form-page';

class App extends React.Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="form" element={<FormPage />} />
          <Route path="404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="404" replace />} />
        </Route>
      </Routes>
    );
  }
}

export default App;
