import React from 'react';
import styles from './about-page.module.css';

class AboutPage extends React.Component {
  render() {
    return (
      <div className={styles['about']} data-testid={'about'}>
        <p>
          Hello, my name is Andrew and I&apos;m interested in creating fun and well designed apps.
        </p>
      </div>
    );
  }
}

export default AboutPage;
