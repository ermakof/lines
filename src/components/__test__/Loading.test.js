import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';

import Loading from '@/src/components/Loading';

let container;

beforeEach(() => {
  container = document.createElement('div');
  container.setAttribute('id', 'loading');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe('Loading', () => {
  it('Render loading', () => {
    act(() => {
      ReactDOM.render(<Loading />, container);
    });
    const topPanel = screen.getByRole(/^loading$/gi);
    expect(topPanel).toBeInTheDocument();
  });
});
