import { render, screen } from '@testing-library/react';
import App from './App';

describe('Main page text', () => {
  test('renders header text', () => {
    render(<App />);
    const headerText = screen.getByText(/scrabble points calculator deluxe/i);
    expect(headerText).toBeInTheDocument();
  });

  test('renders footer text', () => {
    render(<App />);
    const footerText = screen.getByText(/cognizant gobiz technical challenge march 2024/i);
    expect(footerText).toBeInTheDocument();
  })
})
