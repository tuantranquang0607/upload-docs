import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Upload Document heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Upload Document/i);
  expect(headingElement).toBeInTheDocument();
});
 
