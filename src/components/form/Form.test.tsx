import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Form from '.';
import userEvent from '@testing-library/user-event';
import user from '@testing-library/user-event';

describe('Form', () => {
  const addNewCards = jest.fn(() => {});

  beforeEach(() => {
    render(<Form addNewCards={addNewCards} />);
  });

  it('should render Form component', () => {
    expect(screen.getByTestId('form')).toBeInTheDocument();
  });

  it('should contain character-name element', () => {
    expect(screen.getByText(/Enter your character name/i)).toBeInTheDocument();
  });

  it('should contain character-status element', () => {
    expect(screen.getByText(/Choose your character status/i)).toBeInTheDocument();
  });

  it('should contain character-species element', () => {
    expect(screen.getByText(/Choose your character species/i)).toBeInTheDocument();
  });

  it('should contain character-gender element', () => {
    expect(screen.getByText(/Enter your character gender/i)).toBeInTheDocument();
  });

  it('should contain character-origin element', () => {
    expect(screen.getByText(/Enter where are your character from/i)).toBeInTheDocument();
  });

  it('should contain character-location element', () => {
    expect(screen.getByText(/Enter your character current location/i)).toBeInTheDocument();
  });

  it('should contain date element', () => {
    expect(screen.getByText(/Choose when your character was created/i)).toBeInTheDocument();
  });

  it('should contain character-avatar element', () => {
    expect(screen.getByText(/Upload your character avatar/i)).toBeInTheDocument();
  });

  it('should contain agreement element', () => {
    expect(screen.getByText(/Agree to data processing/i)).toBeInTheDocument();
  });

  it('should contain submit button element', () => {
    expect(screen.getByTestId('submit-btn')).toBeInTheDocument();
  });

  it('should contain reset button element', () => {
    expect(screen.getByTestId('reset-btn')).toBeInTheDocument();
  });

  it('should have a disabled submit button at initialization', () => {
    expect(screen.getByTestId('submit-btn')).toBeDisabled();
  });

  it('should change a submit button state after the user first interaction with character-name field', () => {
    expect(screen.getByTestId('submit-btn')).toBeDisabled();
    userEvent.type(screen.getByTestId('character-name'), 'name');
    expect(screen.getByTestId('submit-btn')).not.toBeDisabled();
  });

  it('should change a submit button state after the user first interaction with character-status drop down list', () => {
    expect(screen.getByTestId('submit-btn')).toBeDisabled();
    userEvent.selectOptions(screen.getByTestId('character-status'), 'Alive');
    expect(screen.getByTestId('submit-btn')).not.toBeDisabled();
  });

  it('should change a submit button state after the user first interaction with character-species drop down list', () => {
    expect(screen.getByTestId('submit-btn')).toBeDisabled();
    userEvent.selectOptions(screen.getByTestId('character-species'), 'Human');
    expect(screen.getByTestId('submit-btn')).not.toBeDisabled();
  });

  it('should change a submit button state after the user first interaction with character-gender field', () => {
    expect(screen.getByTestId('submit-btn')).toBeDisabled();
    userEvent.type(screen.getByTestId('character-gender'), 'gender');
    expect(screen.getByTestId('submit-btn')).not.toBeDisabled();
  });

  it('should change a submit button state after the user first interaction with character-origin field', () => {
    expect(screen.getByTestId('submit-btn')).toBeDisabled();
    userEvent.type(screen.getByTestId('character-origin'), 'origin');
    expect(screen.getByTestId('submit-btn')).not.toBeDisabled();
  });

  it('should change a submit button state after the user first interaction with character-location field', () => {
    expect(screen.getByTestId('submit-btn')).toBeDisabled();
    userEvent.type(screen.getByTestId('character-location'), 'location');
    expect(screen.getByTestId('submit-btn')).not.toBeDisabled();
  });

  it('should change a submit button state after the user first interaction with character-date-of-creation field', () => {
    const input = screen.getByTestId('character-date');

    expect(screen.getByTestId('submit-btn')).toBeDisabled();
    fireEvent.input(input);
    fireEvent.change(input, { target: { value: '2020-05-24' } });
    expect(screen.getByTestId('submit-btn')).not.toBeDisabled();
  });

  it('should change a submit button state after the user first interaction with character-avatar field', () => {
    const file = new File(['avatar'], 'avatar.png', { type: 'image/png' });

    expect(screen.getByTestId('submit-btn')).toBeDisabled();
    user.upload(screen.getByTestId('character-avatar'), file);
    expect(screen.getByTestId('submit-btn')).not.toBeDisabled();
  });

  it('should change a submit button state after the user first interaction with form', () => {
    expect(screen.getByTestId('submit-btn')).toBeDisabled();
    userEvent.click(screen.getByTestId('agreement'));
    expect(screen.getByTestId('submit-btn')).not.toBeDisabled();
  });

  it('should disable submit button and reset form fields on reset button click', () => {
    const agreementCheckbox = screen.getByTestId('agreement');
    const nameInput = screen.getByTestId('character-name');
    const submitButton = screen.getByTestId('submit-btn');
    const resetButton = screen.getByTestId('reset-btn');

    expect(submitButton).toBeDisabled();
    userEvent.click(agreementCheckbox);
    userEvent.type(nameInput, 'name');
    expect(submitButton).not.toBeDisabled();

    expect(resetButton).toBeInTheDocument();
    userEvent.click(resetButton);
    expect(submitButton).toBeDisabled();
    expect(agreementCheckbox).not.toBeChecked();
    expect(nameInput).not.toHaveValue();
  });

  it('should disable submit button, show that field contains incorrect information and disable card creation in case of failed validation', () => {
    const agreementCheckbox = screen.getByTestId('agreement');
    const submitButton = screen.getByTestId('submit-btn');

    expect(submitButton).toBeDisabled();
    userEvent.click(agreementCheckbox);
    expect(submitButton).not.toBeDisabled();

    userEvent.click(submitButton);
    expect(submitButton).toBeDisabled();
    expect(addNewCards).not.toBeCalled();
    expect(screen.getByTestId('character-name')).toHaveClass('input-invalid');
    expect(screen.getByTestId('character-status')).toHaveClass('input');
    expect(screen.getByTestId('character-species')).toHaveClass('input');
    expect(screen.getByTestId('character-gender')).toHaveClass('input-invalid');
    expect(screen.getByTestId('character-origin')).toHaveClass('input-invalid');
    expect(screen.getByTestId('character-location')).toHaveClass('input-invalid');
    expect(screen.getByTestId('character-avatar')).toHaveClass('character-avatar-input-invalid');
    expect(screen.getByTestId('character-date')).toHaveClass(
      'character-date-of-creation-input-invalid'
    );
  });

  it('should show and hide validation error message on input after attempt of submit non valid form', () => {
    const agreementCheckbox = screen.getByTestId('agreement');
    const submitButton = screen.getByTestId('submit-btn');
    const nameInput = screen.getByTestId('character-name');

    userEvent.click(agreementCheckbox);
    userEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
    expect(addNewCards).not.toBeCalled();

    expect(nameInput).toHaveClass('input-invalid');
    userEvent.type(nameInput, 'name');
    expect(nameInput).toHaveClass('input');
  });
});
