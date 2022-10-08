import React from 'react';
import styles from './validation-message.module.css';

interface ValidationMessageProps {
  isValid: boolean;
  message: string;
}

class ValidationMessage extends React.Component<ValidationMessageProps> {
  constructor(props: ValidationMessageProps) {
    super(props);
  }

  render() {
    return (
      <div
        className={
          styles[
            `${this.props.isValid ? 'validation-error-message' : 'validation-error-message-active'}`
          ]
        }
        data-testid={'validation-message'}
      >
        {this.props.message}
      </div>
    );
  }
}

export default ValidationMessage;
