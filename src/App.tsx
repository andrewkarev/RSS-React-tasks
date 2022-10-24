import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import AboutPage from './pages/about-page';
import MainPage from 'pages/main-page';
import NotFoundPage from 'pages/not-found-page';
import Layout from 'components';
import FormPage from 'pages/form-page';
import ICard from 'interfaces/ICard';
import AppPathesEnum from 'common/enums/app-pathes';

const App: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<ICard | null>(null);
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const setSelectedCardValue = (card: ICard) => {
    setSelectedCard(() => card);
  };

  const toggleModalWindow = () => {
    const body = document.querySelector('body');

    if (!body) return;

    if (!isModalOpened) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'auto';
    }

    setIsModalOpened((prevModalState) => !prevModalState);
  };

  return (
    <Routes>
      <Route path={AppPathesEnum.home} element={<Layout />}>
        <Route
          index
          element={
            <MainPage
              selectedCard={selectedCard}
              isModalOpened={isModalOpened}
              setSelectedCardValue={setSelectedCardValue}
              toggleModalWindow={toggleModalWindow}
            />
          }
        />
        <Route path={AppPathesEnum.about} element={<AboutPage />} />
        <Route
          path={AppPathesEnum.form}
          element={
            <FormPage
              selectedCard={selectedCard}
              isModalOpened={isModalOpened}
              setSelectedCardValue={setSelectedCardValue}
              toggleModalWindow={toggleModalWindow}
            />
          }
        />
        <Route path={AppPathesEnum.notFound} element={<NotFoundPage />} />
        <Route
          path={AppPathesEnum.redirect}
          element={<Navigate to={AppPathesEnum.notFound} replace />}
        />
      </Route>
    </Routes>
  );
};

export default App;
