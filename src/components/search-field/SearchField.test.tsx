import React, { SyntheticEvent } from 'react';
import { render, screen } from '@testing-library/react';
import SearchField from './SearchField';
import userEvent from '@testing-library/user-event';

describe('SearchField', () => {
  const onChange = jest.fn((e: SyntheticEvent) => {
    if (!(e.target instanceof HTMLInputElement)) return;
  });

  it('should render SearchField component', () => {
    render(<SearchField handleChange={onChange} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should be in focus after render', () => {
    render(<SearchField handleChange={onChange} />);
    expect(screen.getByRole('textbox')).toHaveFocus();
  });

  it('calls the onChange callback handler', () => {
    render(<SearchField handleChange={onChange} />);

    const query = 'Morty';

    userEvent.type(screen.getByRole('textbox'), query);

    expect(onChange).toHaveBeenCalledTimes(query.length);
  });
});
