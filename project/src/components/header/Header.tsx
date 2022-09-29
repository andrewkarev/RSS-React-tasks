import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './header.module.css';

class Header extends React.Component {
  render() {
    return (
      <header className={styles.header}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="about">About</NavLink>
      </header>
    );
  }
}

export default Header;
