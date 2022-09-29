import SearchField from 'components/search-field/SearchField';
import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './header.module.css';

class Header extends React.Component {
  render() {
    return (
      <header className={styles.header}>
        <div className="container">
          <div className={styles['header-content-wrapper']}>
            <nav className={styles['header-links']}>
              <div className={styles['link-container']}>
                <NavLink
                  to="main"
                  className={({ isActive }) => (isActive ? styles['link-active'] : styles.link)}
                >
                  Home
                </NavLink>
              </div>
              <div className={styles['link-container']}>
                <NavLink
                  to="about"
                  className={({ isActive }) => (isActive ? styles['link-active'] : styles.link)}
                >
                  About
                </NavLink>
              </div>
            </nav>
            <SearchField />
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
