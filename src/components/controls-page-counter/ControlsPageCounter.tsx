import React from 'react';
import styles from './controls-page-counter.module.css';

interface ControlsPageCounterProps {
  quantity: string;
}

export const ControlsPageCounter: React.FC<ControlsPageCounterProps> = ({ quantity }) => {
  return (
    <>
      <input
        className={styles[`input-cards-on-page-${quantity}`]}
        id={`input-cards-on-page-${quantity}`}
        type="radio"
        name="cards-on-page"
      />
      <label
        className={styles[`input-cards-on-page-${quantity}-label`]}
        htmlFor={`input-cards-on-page-${quantity}`}
      >
        {quantity}
      </label>
    </>
  );
};

export default ControlsPageCounter;
