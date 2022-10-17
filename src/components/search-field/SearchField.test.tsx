import React, { SyntheticEvent } from 'react';
import { render, screen } from '@testing-library/react';
import SearchField from './SearchField';
import userEvent from '@testing-library/user-event';

describe('SearchField', () => {
  const onChange = jest.fn((e: SyntheticEvent) => {
    if (!(e.target instanceof HTMLInputElement)) return;
  });

  const onSubmit = jest.fn();

  it('should render SearchField component', () => {
    render(<SearchField currentValue="" handleChange={onChange} handleSubmit={onSubmit} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should be in focus after render', () => {
    render(<SearchField currentValue="" handleChange={onChange} handleSubmit={onSubmit} />);
    expect(screen.getByRole('textbox')).toHaveFocus();
  });

  it('calls the onChange callback handler', () => {
    render(<SearchField currentValue="" handleChange={onChange} handleSubmit={onSubmit} />);

    const query = 'Morty';

    userEvent.type(screen.getByRole('textbox'), query);

    expect(onChange).toHaveBeenCalledTimes(query.length);
  });
});
