import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Select from '@src/components/Select';

describe('Select', () => {
  it('render <Select>', () => {
    const handleSelect = jest.fn();
    const { asFragment } = render(<Select onSelect={handleSelect} />);
    expect(asFragment()).toMatchSnapshot();
    let select = screen.getByRole(/select/gi);
    expect(select).toBeInTheDocument();
  });

  it('change on <Select>', () => {
    const handleSelect = jest.fn();
    render(<Select onSelect={handleSelect} />);
    const select = screen.getByRole(/select/gi);
    userEvent.selectOptions(select, '1');
    const option1 = screen.getByRole('option', { name: 'Падаван' }) as HTMLOptionElement;
    expect(option1.selected).toBe(true);
    const option2 = screen.getByRole('option', { name: 'Джедай' }) as HTMLOptionElement;
    expect(option2.selected).toBe(false);
    const option3 = screen.getByRole('option', { name: 'Мастер-джедай' }) as HTMLOptionElement;
    expect(option3.selected).toBe(false);
    const option4 = screen.getByRole('option', { name: 'Член Совета Силы' }) as HTMLOptionElement;
    expect(option4.selected).toBe(false);
  });
});
