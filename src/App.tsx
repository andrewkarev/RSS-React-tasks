import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import AboutPage from './pages/about-page';
import MainPage from 'pages/main-page';
import NotFoundPage from 'pages/not-found-page';
import Layout from 'components';
import FormPage from 'pages/form-page';
import ICard from 'interfaces/ICard';

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
      <Route path="/" element={<Layout />}>
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
        <Route path="about" element={<AboutPage />} />
        <Route
          path="form"
          element={
            <FormPage
              selectedCard={selectedCard}
              isModalOpened={isModalOpened}
              setSelectedCardValue={setSelectedCardValue}
              toggleModalWindow={toggleModalWindow}
            />
          }
        />
        <Route path="404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="404" replace />} />
      </Route>
    </Routes>
  );
};

export default App;
