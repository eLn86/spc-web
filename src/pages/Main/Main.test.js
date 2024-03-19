import * as dictionaryAPI from "../../apis/dictionaryAPI";
jest.mock("../../apis/dictionaryAPI");

import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import Main from './Main';
import { HTTPSTATUS } from "../../constants";

jest.mock('axios');
describe('main page text and elements', () => {
    test('Renders input field with max length 10', () => {
        render(<Main />);
        const inputField = screen.getByTestId('input-field');
        expect(inputField).toHaveAttribute('maxlength', '10');
    })

    test('Renders 10 tiles', () => {
        render(<Main />);
        const tileArray = screen.getAllByTestId('tile');
        expect(tileArray).toHaveLength(10);
    })

    test('Renders score text', () => {
        render(<Main />);
        const scoreText = screen.getByText(/score:/i);
        expect(scoreText).toBeInTheDocument();
    })

    test('Renders reset button and text', () => {
        render(<Main />);
        const resetButton = screen.getByTestId('reset-tiles-btn');
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
});

describe('input behaviour, logic and error text', () => {
    test('calls checkIfValidWord function on input change after debounce time of 0.5s', async () => {
        jest.useFakeTimers();
        dictionaryAPI.checkIfValidWord.mockResolvedValue({ status: HTTPSTATUS.OK });
        render(<Main/>);

        // Simulate typing in input field and waits for timeout callback to execute before considering cycle as completed with act()
        act(() => {
            fireEvent.change(screen.getByTestId('input-field'), { target: { value: 'example' }})
        })

        await waitFor(() => expect(dictionaryAPI.checkIfValidWord).toHaveBeenCalledTimes(1));

        jest.useRealTimers();
    })

    test('that checkIfValidWord function is not called if word is empty string', async () => {
        jest.useFakeTimers();
        dictionaryAPI.checkIfValidWord.mockResolvedValue({ status: HTTPSTATUS.OK });
        render(<Main/>);

        // Simulate typing in input field and waits for timeout callback to execute before considering cycle as completed with act()
        act(() => {
            fireEvent.change(screen.getByTestId('input-field'), { target: { value: '' }})
        })

        await waitFor(() => expect(dictionaryAPI.checkIfValidWord).not.toHaveBeenCalled());

        jest.useRealTimers();
    })

    test('that input has red border when word is invalid', async () => {
        jest.useFakeTimers();
        dictionaryAPI.checkIfValidWord.mockResolvedValue({ status: HTTPSTATUS.NOTFOUND });
        render(<Main/>);

        const inputField = screen.getByTestId('input-field');
        // Simulate typing in input field and waits for timeout callback to execute before considering cycle as completed with act()
        act(() => {
            fireEvent.change(inputField, { target: { value: 'invalidw' }})
        })

        await waitFor(() => {
            expect(dictionaryAPI.checkIfValidWord).toHaveBeenCalledTimes(1);
            expect(inputField).toHaveStyle('border: 1px solid red');
        });

        jest.useRealTimers();
    })

    test('that error text displays below input when word is invalid', async () => {
        jest.useFakeTimers();
        dictionaryAPI.checkIfValidWord.mockResolvedValue({ status: HTTPSTATUS.NOTFOUND });
        render(<Main/>);

        const inputField = screen.getByTestId('input-field');
        // Simulate typing in input field and waits for timeout callback to execute before considering cycle as completed with act()
        act(() => {
            fireEvent.change(inputField, { target: { value: 'invalidw' }})
        })

        await waitFor(() => {
            expect(dictionaryAPI.checkIfValidWord).toHaveBeenCalledTimes(1);
            expect(screen.getByTestId('invalid-word-error-text')).toHaveTextContent('The word you typed is invalid, please try another word!')
        });

        jest.useRealTimers();
    })
});

describe('scoring', () => {
    test('score is N/A when word is empty string', async () => {
        jest.useFakeTimers();
        dictionaryAPI.checkIfValidWord.mockResolvedValue({ status: HTTPSTATUS.OK });
        render(<Main/>);

        // Simulate typing in input field and waits for timeout callback to execute before considering cycle as completed with act()
        act(() => {
            fireEvent.change(screen.getByTestId('input-field'), { target: { value: '' }})
        })

        await waitFor(() => {
            expect(screen.getByTestId('score')).toHaveTextContent('N/A');
        });

        jest.useRealTimers();
    })

    test('score is N/A when word is invalid', async () => {
        jest.useFakeTimers();
        dictionaryAPI.checkIfValidWord.mockResolvedValue({ status: HTTPSTATUS.NOTFOUND });
        render(<Main/>);

        // Simulate typing in input field and waits for timeout callback to execute before considering cycle as completed with act()
        act(() => {
            fireEvent.change(screen.getByTestId('input-field'), { target: { value: 'kdjnkj' }})
        })

        await waitFor(() => {
            expect(screen.getByTestId('score')).toHaveTextContent('N/A');
        });

        jest.useRealTimers();
    })

    test('to give an accurate scoring of the word ambiguity (17 points)', async () => {
        jest.useFakeTimers();
        dictionaryAPI.checkIfValidWord.mockResolvedValue({ status: HTTPSTATUS.OK });
        render(<Main/>);

        // Simulate typing in input field and waits for timeout callback to execute before considering cycle as completed with act()
        act(() => {
            fireEvent.change(screen.getByTestId('input-field'), { target: { value: 'ambiguity' }})
        })

        await waitFor(() => {
            expect(screen.getByTestId('score')).toHaveTextContent('17');
        });

        jest.useRealTimers();
    })
})

describe('button behaviours', () => {
    test('reset tiles resets the score and value and error text', async () => {
        jest.useFakeTimers();
        dictionaryAPI.checkIfValidWord.mockResolvedValue({ status: HTTPSTATUS.OK });
        render(<Main/>);

        const inputField = screen.getByTestId('input-field');
        const scoreField = screen.getByTestId('score');
        const resetTilesButton = screen.getByTestId('reset-tiles-btn');

        // Simulate typing in input field and waits for timeout callback to execute before considering cycle as completed with act()
        act(() => {
            fireEvent.change(inputField, { target: { value: 'ambivalent' }})
        })

        await waitFor(() => {
            expect(inputField).toHaveValue('ambivalent');
            expect(scoreField).toHaveTextContent('17');
        });

        act(() => {
            fireEvent.click(resetTilesButton);
        })

        await waitFor(() => {
            expect(inputField).toHaveValue('');
            expect(scoreField).toHaveTextContent('N/A');
        });

        jest.useRealTimers();
    })
})