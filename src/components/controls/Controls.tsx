import React, { SyntheticEvent } from 'react';
import SearchField from 'components/search-field';
import styles from './controls.module.css';

interface ControlsProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: SyntheticEvent) => void;
}

export const Controls: React.FC<ControlsProps> = ({ handleSubmit, handleChange }) => {
  return (
    <form className={styles['controls']} onSubmit={handleSubmit}>
      <SearchField handleChange={handleChange} />
    </form>
  );
};

export default Controls;
