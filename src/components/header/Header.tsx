import AppPathesEnum from 'common/enums/app-pathes';
import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './header.module.css';

class Header extends React.Component {
  render() {
    return (
      <header className={styles['header']} data-testid={'header'}>
        <div className="container">
          <div className={styles['header-content-wrapper']}>
            <nav className={styles['header-links']}>
              <div className={styles['link-container']}>
                <NavLink
                  to={AppPathesEnum.home}
                  className={({ isActive }) => (isActive ? styles['link-active'] : styles['link'])}
                  end
                >
                  Home
                </NavLink>
              </div>
              <div className={styles['link-container']}>
                <NavLink
                  to={AppPathesEnum.about}
                  className={({ isActive }) => (isActive ? styles['link-active'] : styles['link'])}
                >
                  About
                </NavLink>
              </div>
              <div className={styles['link-container']}>
                <NavLink
                  to={AppPathesEnum.form}
                  className={({ isActive }) => (isActive ? styles['link-active'] : styles['link'])}
                >
                  Create
                </NavLink>
              </div>
            </nav>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
