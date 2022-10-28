import IControlsInputs from 'interfaces/IControlsInpust';
import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import styles from './controls-page-counter.module.css';

interface ControlsPageCounterProps {
  quantity: string;
  register: UseFormRegister<IControlsInputs>;
}

export const ControlsPageCounter: React.FC<ControlsPageCounterProps> = ({ quantity, register }) => {
  return (
    <>
      <input
        {...register('itemsOnPage')}
        className={styles[`input-cards-on-page-${quantity}`]}
        id={`input-cards-on-page-${quantity}`}
        type="radio"
        value={quantity}
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
