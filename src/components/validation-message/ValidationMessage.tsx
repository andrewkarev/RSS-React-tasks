import React from 'react';
import styles from './validation-message.module.css';

interface ValidationMessageProps {
  isValid: boolean;
  message: string;
}

const ValidationMessage: React.FC<ValidationMessageProps> = ({ isValid, message }) => (
  <div
    className={
      styles[`${isValid ? 'validation-error-message' : 'validation-error-message-active'}`]
    }
    data-testid={'validation-message'}
  >
    {message}
  </div>
);

export default ValidationMessage;
