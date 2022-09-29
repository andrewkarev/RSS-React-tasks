import React from 'react';
import styles from './footer.module.css';

class Footer extends React.Component {
  render() {
    return (
      <div className="container">
        <footer className={styles.footer}>
          <p className={styles['footer-item']}>2022</p>
          <p className={styles['footer-item']}>“Sometimes science is more art than science.”</p>
        </footer>
      </div>
    );
  }
}

export default Footer;
