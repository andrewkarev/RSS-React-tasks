import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import AboutPage from './pages/about-page';
import MainPage from 'pages/main-page';
import NotFoundPage from 'pages/not-found-page';
import Layout from 'components';
import FormPage from 'pages/form-page';
import AppPathesEnum from 'common/enums/app-pathes';
import CardDetailsPage from 'pages/card-details-page';

const App: React.FC = () => (
  <Routes>
    <Route path={AppPathesEnum.home} element={<Layout />}>
      <Route index element={<MainPage />} />
      <Route path={AppPathesEnum.about} element={<AboutPage />} />
      <Route path={AppPathesEnum.form} element={<FormPage />} />
      <Route path={AppPathesEnum.notFound} element={<NotFoundPage />} />
      <Route path={`${AppPathesEnum.character}/:id`} element={<CardDetailsPage />} />
      <Route
        path={AppPathesEnum.redirect}
        element={<Navigate to={AppPathesEnum.notFound} replace />}
      />
    </Route>
  </Routes>
);

export default App;
