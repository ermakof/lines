import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';

import Root from '@/src/Root';

let container;

beforeEach(() => {
  container = document.createElement('root');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe('Lines', () => {
  it('Render Root', () => {
    act(() => {
      ReactDOM.render(<Root />, container);
    });
    const topPanel = screen.getByRole(/^rootApp$/gi);
    expect(topPanel).toBeInTheDocument();
  });
});
