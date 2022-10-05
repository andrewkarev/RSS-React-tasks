import Form from 'components/form/Form';
import React from 'react';
import styles from './form-page.module.css';

class FormPage extends React.Component {
  render() {
    return (
      <div className={styles['form-page']} data-testid={'form'}>
        <h2 className={styles['form-page-title']}>Create new character</h2>
        <div className={styles['form-container']}>
          <Form />
        </div>
        <div className={styles['cards-container']}></div>
      </div>
    );
  }
}

export default FormPage;
