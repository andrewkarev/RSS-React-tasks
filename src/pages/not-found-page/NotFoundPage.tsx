import React from 'react';
import styles from './not-found-page.module.css';
import NOT_FOUND_PAGE_IMG from './../../assets/images/not-found.png';

const NotFoundPage: React.FC = () => (
  <div className={styles['not-found-page']} data-testid={'not-found'}>
    <h2 className={styles['not-found-page-title']}>Page not found</h2>
    <p className={styles['not-found-page-message']}>
      We couldn&apos;t find what you were looking for.
    </p>
    <p className={styles['not-found-page-message']}>
      Please contact the owner of the site that linked you to the original URL and let them know
      their link is broken.
    </p>
    <img className={styles['not-found-page-image']} src={NOT_FOUND_PAGE_IMG} alt="Rick and Morty" />
  </div>
);

export default NotFoundPage;
