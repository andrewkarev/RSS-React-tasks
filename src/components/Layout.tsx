import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './footer';
import Header from './header';
import styles from './layout.module.css';

const Layout: React.FC = () => {
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
};

export default Layout;
