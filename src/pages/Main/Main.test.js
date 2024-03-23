import '../../setupDomTests';
import * as dictionaryAPI from "../../apis/dictionaryAPI";
import * as scoresAPI from "../../apis/scoresAPI";
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import Main from './Main';
import { HTTPSTATUS } from "../../constants";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import TopScores from "../TopScores/TopScores";
import React from "react";

jest.mock("../../apis/dictionaryAPI");
jest.mock("../../apis/scoresAPI");


jest.mock('axios');
describe('main page text and elements', () => {
    test('home page text', () => {
        render(
            <MemoryRouter>
                <Main/>
            </MemoryRouter>
        );
        const welcomeText = screen.getByText(/welcome! please type a word in the field below to begin!/i);
        expect(welcomeText).toBeInTheDocument();
    })

    test('Renders input field with max length 10', () => {
        jest.useFakeTimers();
        render(
            <MemoryRouter>
                <Main/>
            </MemoryRouter>
        );
        const inputField = screen.getByTestId('input-field');
        jest.advanceTimersByTime(600);
        expect(inputField).toHaveAttribute('maxlength', '10');
        expect(inputField.value).toBe('');
        jest.advanceTimersByTime(300);
        jest.useRealTimers();
    })

    test('Renders 10 tiles', () => {
        render(
            <MemoryRouter>
                <Main/>
            </MemoryRouter>
        );
        const tileArray = screen.getAllByTestId('tile');
        expect(tileArray).toHaveLength(10);
    })

    test('Renders score text', () => {
        render(
            <MemoryRouter>
                <Main/>
            </MemoryRouter>
        );
        const scoreText = screen.getByText(/score:/i);
        expect(scoreText).toBeInTheDocument();
    })

    test('Renders reset button and text', () => {
        render(
            <MemoryRouter>
                <Main/>
            </MemoryRouter>
        );
        const resetButton = screen.getByTestId('reset-tiles-btn');
        const resetTilesText = screen.getByText(/reset tiles/i);
        expect(resetButton).toBeInTheDocument();
        expect(resetTilesText).toBeInTheDocument();
    })

    test('Renders save button', () => {
        render(
            <MemoryRouter>
                <Main/>
            </MemoryRouter>
        );
        const saveScoreButton = screen.getByTestId('save-btn');
        const saveScoreText = screen.getByText(/save score/i);
        expect(saveScoreButton).toBeInTheDocument();
        expect(saveScoreText).toBeInTheDocument();
    })

    test('Renders view top scores button', () => {
        render(
            <MemoryRouter>
                <Main/>
            </MemoryRouter>
        );
        const viewTopScoresButton = screen.getByTestId('view-top-scores-btn');
        const viewTopScoresText = screen.getByText(/view top scores/i);
        expect(viewTopScoresButton).toBeInTheDocument();
        expect(viewTopScoresText).toBeInTheDocument();
    })
});

describe('input behaviour, logic and error text', () => {
    test('calls checkIfValidWord function on input change after debounce time of 0.5s', async () => {
        jest.useFakeTimers();
        dictionaryAPI.checkIfValidWord.mockResolvedValue({ status: HTTPSTATUS.OK });
        render(
            <MemoryRouter>
                <Main/>
            </MemoryRouter>
        );

        // Simulate typing in input field and waits for timeout callback to execute before considering cycle as completed with act()
        act(() => {
            fireEvent.change(screen.getByTestId('input-field'), { target: { value: 'example' } })
        })

        await waitFor(() => expect(dictionaryAPI.checkIfValidWord).toHaveBeenCalledTimes(1));

        jest.useRealTimers();
    })

    test('that checkIfValidWord function is not called if word is empty string', async () => {
        jest.useFakeTimers();
        dictionaryAPI.checkIfValidWord.mockResolvedValue({ status: HTTPSTATUS.OK });
        render(
            <MemoryRouter>
                <Main/>
            </MemoryRouter>
        );

        act(() => {
            fireEvent.change(screen.getByTestId('input-field'), { target: { value: '' } })
        })

        await waitFor(() => expect(dictionaryAPI.checkIfValidWord).not.toHaveBeenCalled());

        jest.useRealTimers();
    })

    test('sets isInvalidWord to false and score to 0 for input longer than 10 characters', async () => {
        render(
            <MemoryRouter>
                <Main/>
            </MemoryRouter>
        );
        const inputField = screen.getByTestId('input-field');
        act(() => {
            fireEvent.change(inputField, { target: { value: '' } });
        })

        // Wait for the debounce timeout
        await waitFor(() => {
            expect(screen.getByTestId('invalid-word-error-text')).not.toHaveTextContent('The word you typed is invalid, please try another word!');
            expect(screen.getByTestId('score')).toHaveTextContent('Score: N/A');
        }, { timeout: 600 });
    });

    test('that input has red border when word is invalid', async () => {
        jest.useFakeTimers();
        dictionaryAPI.checkIfValidWord.mockResolvedValue({ status: HTTPSTATUS.NOTFOUND });
        render(
            <MemoryRouter>
                <Main/>
            </MemoryRouter>
        );

        const inputField = screen.getByTestId('input-field');
        // Simulate typing in input field and waits for timeout callback to execute before considering cycle as completed with act()
        act(() => {
            fireEvent.change(inputField, { target: { value: 'invalidw' } })
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
        render(
            <MemoryRouter>
                <Main/>
            </MemoryRouter>
        );

        const inputField = screen.getByTestId('input-field');
        // Simulate typing in input field and waits for timeout callback to execute before considering cycle as completed with act()
        act(() => {
            fireEvent.change(inputField, { target: { value: 'invalidw' } })
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
        render(
            <MemoryRouter>
                <Main/>
            </MemoryRouter>
        );

        // Simulate typing in input field and waits for timeout callback to execute before considering cycle as completed with act()
        act(() => {
            fireEvent.change(screen.getByTestId('input-field'), { target: { value: '' } })
        })

        await waitFor(() => {
            expect(screen.getByTestId('score')).toHaveTextContent('N/A');
        });

        jest.useRealTimers();
    })

    test('score is N/A when word is invalid', async () => {
        jest.useFakeTimers();
        dictionaryAPI.checkIfValidWord.mockResolvedValue({ status: HTTPSTATUS.NOTFOUND });
        render(
            <MemoryRouter>
                <Main/>
            </MemoryRouter>
        );

        // Simulate typing in input field and waits for timeout callback to execute before considering cycle as completed with act()
        act(() => {
            fireEvent.change(screen.getByTestId('input-field'), { target: { value: 'kdjnkj' } })
        })

        await waitFor(() => {
            expect(screen.getByTestId('score')).toHaveTextContent('N/A');
        });

        jest.useRealTimers();
    })

    test('to give an accurate scoring of the word ambiguity (17 points)', async () => {
        jest.useFakeTimers();
        dictionaryAPI.checkIfValidWord.mockResolvedValue({ status: HTTPSTATUS.OK });
        render(
            <MemoryRouter>
                <Main/>
            </MemoryRouter>
        );

        // Simulate typing in input field and waits for timeout callback to execute before considering cycle as completed with act()
        act(() => {
            fireEvent.change(screen.getByTestId('input-field'), { target: { value: 'ambiguity' } })
        })

        await waitFor(() => {
            expect(screen.getByTestId('score')).toHaveTextContent('17');
        });

        jest.useRealTimers();
    })
})

describe('button behaviours', () => {
    beforeEach(() => {
        const mockScores = {
            data: {
                scores: [
                    { word: 'example', score: 10 },
                    { word: 'example', score: 10 },
                    { word: 'example', score: 10 }
                ]
            }
        }
        scoresAPI.getTopTenScores.mockResolvedValue(mockScores);

        dictionaryAPI.checkIfValidWord.mockResolvedValue({ status: 200 });
        scoresAPI.saveScore.mockResolvedValue({
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            word: "string",
            score: 0
        });
    })

    test('reset tiles resets the score and value and error text', async () => {
        jest.useFakeTimers();
        dictionaryAPI.checkIfValidWord.mockResolvedValue({ status: HTTPSTATUS.OK });
        render(
            <MemoryRouter>
                <Main/>
            </MemoryRouter>
        );

        const inputField = screen.getByTestId('input-field');
        const scoreField = screen.getByTestId('score');
        const resetTilesButton = screen.getByTestId('reset-tiles-btn');

        // Simulate typing in input field and waits for timeout callback to execute before considering cycle as completed with act()
        act(() => {
            fireEvent.change(inputField, { target: { value: 'ambivalent' } })
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

    test('save scores successfully and show save score text', async () => {
        jest.useFakeTimers();

        render(
            <MemoryRouter>
                <Main/>
            </MemoryRouter>
        );

        const inputField = screen.getByTestId('input-field');
        fireEvent.change(inputField, { target: { value: 'ambivalent' } })

        act(() => {
            jest.advanceTimersByTime(600);
        })

        const saveScoreButton = screen.getByTestId('save-btn');
        fireEvent.click(saveScoreButton)

        await waitFor(() => {
            expect(screen.getByTestId('score-saved')).toHaveTextContent('Your score has been saved!');
        })

        act(() => {
            jest.advanceTimersByTime(3000);
        })

        await waitFor(() => {
            expect(screen.getByTestId('score-saved')).not.toHaveTextContent('Your score has been saved!');
            expect(dictionaryAPI.checkIfValidWord).toHaveBeenCalledTimes(1);
            expect(scoresAPI.saveScore).toHaveBeenCalledTimes(1);
        })

        jest.useRealTimers();
    })

    test('save scores not successful and logs error', async () => {
        const mockErrorResponse = {
            code: 'ERR_INTERNAL_SERVER',
            response: { status: 500 },
        }
        scoresAPI.saveScore.mockRejectedValue(mockErrorResponse);

        const consoleSpy = jest.spyOn(console, 'log');
        consoleSpy.mockImplementation(() => {
        });

        jest.useFakeTimers();

        render(
            <MemoryRouter>
                <Main/>
            </MemoryRouter>
        );

        const inputField = screen.getByTestId('input-field');
        fireEvent.change(inputField, { target: { value: 'ambivalent' } })

        act(() => {
            jest.advanceTimersByTime(600);
        })

        const saveScoreButton = screen.getByTestId('save-btn');
        fireEvent.click(saveScoreButton)

        await waitFor(() => {
            expect(screen.getByTestId('score-saved')).not.toHaveTextContent('Your score has been saved!');
            expect(dictionaryAPI.checkIfValidWord).toHaveBeenCalledTimes(1);
            expect(scoresAPI.saveScore).toHaveBeenCalledTimes(1);
            expect(consoleSpy).toHaveBeenCalledWith('error when calling save score api: ', mockErrorResponse);
        })

        jest.useRealTimers();
        consoleSpy.mockRestore();

    })

    test('navigate to /top-scores page when View Top Scores button clicked', async () => {
        render(
            <MemoryRouter>
                <Routes>
                    <Route path='/' element={<Main/>}/>
                    <Route path='/top-scores' element={<TopScores/>}/>
                </Routes>
            </MemoryRouter>
        );

        const viewTopScoresButton = screen.getByTestId('view-top-scores-btn');
        act(() => {
            // Navigate to top scores page by clicking on View Top Scores button
            fireEvent.click(viewTopScoresButton);
        });

        await waitFor(() => {
            expect(screen.getByTestId('top-scores-title')).toBeInTheDocument();
        });
    })
})