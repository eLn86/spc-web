import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main/Main";
import TopScores from "./pages/TopScores/TopScores";

describe('App layout text', () => {
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

describe('Navigation', () => {
  test('renders Main component as initial route', () => {
    render(
        <MemoryRouter>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/top-scores' element={<TopScores />} />
          </Routes>
        </MemoryRouter>
    );

    const resetTilesBtn = screen.getByTestId('reset-tiles-btn');
    expect(resetTilesBtn).toBeInTheDocument();
  })
})
