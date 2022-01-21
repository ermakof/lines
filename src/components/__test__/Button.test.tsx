import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '@src/components/Button';

describe('Button', () => {
  it('render <Button>', () => {
    const handleClick = jest.fn();
    const { asFragment } = render(<Button onClick={handleClick} title="Reset" />);
    expect(asFragment()).toMatchSnapshot();
    let button = screen.getByRole(/button/gi);
    expect(button).toBeInTheDocument();
    button = screen.getByText(/Reset/gi);
    expect(button).toBeInTheDocument();
  });

  it('click on <Button>', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} title="Reset" />);
    const button = screen.getByRole(/button/gi);
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
