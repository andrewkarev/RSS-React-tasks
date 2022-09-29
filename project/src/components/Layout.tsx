import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './footer/Footer';
import Header from './header/Header';
import styles from './layout.module.css';

class Layout extends React.Component {
  render() {
    return (
      <>
        <Header />
        <main className={styles.main}>
          <Outlet />
        </main>
        <Footer />
      </>
    );
  }
}

export default Layout;
