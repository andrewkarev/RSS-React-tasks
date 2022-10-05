import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './footer/Footer';
import Header from './header/Header';
import styles from './layout.module.css';

class Layout extends React.Component {
  render() {
    return (
      <div className={styles['wwrapper']}>
        <Header />
        <main className={styles['main']}>
          <div className="container">
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default Layout;
