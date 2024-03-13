import { render, screen } from '@testing-library/react';
import Main from './Main';

describe('main page text and elements', () => {
    test('Renders score text', () => {
        render(<Main />);
        const scoreText = screen.getByText(/score:/i);
        expect(scoreText).toBeInTheDocument();
    })

    test('Renders reset button and text', () => {
        render(<Main />);
        const resetButton = screen.getByTestId('reset-button');
        const resetTilesText = screen.getByText(/reset tiles/i);
        expect(resetButton).toBeInTheDocument();
        expect(resetTilesText).toBeInTheDocument();
    })

    test('Renders save button', () => {
        render(<Main />);
        const saveScoreButton = screen.getByTestId('save-button');
        const saveScoreText = screen.getByText(/save score/i);
        expect(saveScoreButton).toBeInTheDocument();
        expect(saveScoreText).toBeInTheDocument();
    })

    test('Renders view top scores button', () => {
        render(<Main />);
        const viewTopScoresButton = screen.getByTestId('view-topscores-button');
        const viewTopScoresText = screen.getByText(/view top scores/i);
        expect(viewTopScoresButton).toBeInTheDocument();
        expect(viewTopScoresText).toBeInTheDocument();
    })
})