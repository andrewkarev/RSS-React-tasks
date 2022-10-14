import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import AboutPage from './pages/about-page';
import MainPage from 'pages/main-page';
import NotFoundPage from 'pages/not-found-page';
import Layout from 'components';
import FormPage from 'pages/form-page';
import ICard from 'interfaces/ICard';

interface AppState {
  selectedCard: ICard | null;
  isModalOpened: boolean;
}

class App extends React.Component<Record<string, never>, AppState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      selectedCard: null,
      isModalOpened: false,
    };
    this.setSelectedCardValue = this.setSelectedCardValue.bind(this);
    this.toggleModalWindow = this.toggleModalWindow.bind(this);
  }

  setSelectedCardValue(card: ICard) {
    this.setState({
      selectedCard: card,
    });
  }

  toggleModalWindow() {
    const body = document.querySelector('body');

    if (!body) return;

    if (!this.state.isModalOpened) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'auto';
    }

    this.setState(({ isModalOpened }) => {
      return { isModalOpened: !isModalOpened };
    });
  }

  render() {
    return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <MainPage
                selectedCard={this.state.selectedCard}
                isModalOpened={this.state.isModalOpened}
                setSelectedCardValue={this.setSelectedCardValue}
                toggleModalWindow={this.toggleModalWindow}
              />
            }
          />
          <Route path="about" element={<AboutPage />} />
          <Route
            path="form"
            element={
              <FormPage
                selectedCard={this.state.selectedCard}
                isModalOpened={this.state.isModalOpened}
                setSelectedCardValue={this.setSelectedCardValue}
                toggleModalWindow={this.toggleModalWindow}
              />
            }
          />
          <Route path="404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="404" replace />} />
        </Route>
      </Routes>
    );
  }
}

export default App;
