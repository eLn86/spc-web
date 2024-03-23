import * as scoresAPI from "../../apis/scoresAPI";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import TopScores from "./TopScores";
import '../../setupDomTests';
import { API_ERRORS, HTTPSTATUS, LABELS, TABLE_ROLES } from "../../constants";
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Main from "../Main/Main";
import axios from "axios";

jest.mock("../../apis/scoresAPI");

jest.mock('axios');

beforeEach(async () => {
    const mockScores = {
        scores: [
            { word: 'example', score: 10 },
            { word: 'example', score: 10 },
            { word: 'magnum', score: 8 }
        ]
    };
    scoresAPI.getTopTenScores.mockResolvedValue(mockScores);
});
describe('TopScores Page UI', () => {
    test('renders header text', async () => {
        render(
            <MemoryRouter>
                <TopScores/>
            </MemoryRouter>
        );
        const headerText = screen.getByText(/top 10 scores/i);
        const backButton = screen.getByTestId('back-to-home-btn');
        await waitFor(() => {
            expect(headerText).toBeInTheDocument();
            expect(backButton).toBeInTheDocument();
        });
    });

    test('render table with Word and Score columns', async () => {
        render(
            <MemoryRouter>
                <TopScores/>
            </MemoryRouter>
        );
        const table = screen.getByTestId('score-table');
        await waitFor(() => {
            expect(table).toBeInTheDocument();
        });

        const headerCellWithWordText = screen.getByRole(TABLE_ROLES.COLUMN_HEADER, { name: 'Word Submitted' });
        const headerCellWithRankText = screen.getByRole(TABLE_ROLES.COLUMN_HEADER, { name: 'Rank' });
        const headerCellWithScoreText = screen.getByRole(TABLE_ROLES.COLUMN_HEADER, { name: 'Score Attained' });
        expect(headerCellWithRankText).toBeInTheDocument();
        expect(headerCellWithWordText).toBeInTheDocument();
        expect(headerCellWithScoreText).toBeInTheDocument();
    })
})

describe('API behavior and resultant UI', () => {
    test('renders top scores page with data provided by API (mocked)', async () => {
        render(
            <MemoryRouter>
                <TopScores/>
            </MemoryRouter>
        );
        // Use findByText to wait for the element to appear. No need for an additional waitFor.
        const magnumText = await screen.findByText('magnum');
        expect(magnumText).toBeVisible();
    })

    test('remaining number of slots to be 10 - apiData.length (length is mocked to be 3)', async () => {
        render(
            <MemoryRouter>
                <TopScores/>
            </MemoryRouter>
        );
        await waitFor(async () => {
            expect(await screen.findAllByText('This slot has yet to be filled!')).toHaveLength(7);
        });
    })

    test('render 10 slots with This slot has yet to be filled! when no api.data', async () => {
        const mockScores = { scores: [] };
        scoresAPI.getTopTenScores.mockResolvedValue(mockScores);
        render(
            <MemoryRouter>
                <TopScores/>
            </MemoryRouter>
        );
        await waitFor(async () => {
            expect(await screen.findAllByText('This slot has yet to be filled!')).toHaveLength(10);
        });
    })

    test('throws error when getTopTenScores fails', async () => {
        const mockErrorResponse = {
            code: 'ERR_INTERNAL_SERVER',
            response: { status: HTTPSTATUS.INTERNAL_SERVER_ERROR, data: { error: API_ERRORS.INTERNAL_SERVER_ERROR } },
        }
        axios.get = scoresAPI.getTopTenScores.mockRejectedValue(mockErrorResponse);

        const consoleSpy = jest.spyOn(console, 'log');
        consoleSpy.mockImplementation(() => {});

        render(
            <MemoryRouter>
                <TopScores/>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(consoleSpy).toHaveBeenCalledWith("error when getting top ten scores: ", mockErrorResponse);
        });

        consoleSpy.mockRestore();
    })

    test('navigate to home page from top scores page when Back to Home button is clicked', async () => {
        render(
            <MemoryRouter initialEntries={['/top-scores']}>
                <Routes>
                    <Route path='/' element={<Main/>}/>
                    <Route path='/top-scores' element={<TopScores/>}/>
                </Routes>
            </MemoryRouter>
        );

        const backButton = screen.getByTestId('back-to-home-btn');
        act(() => {
            // Navigate to top scores page by clicking on View Top Scores button
            fireEvent.click(backButton);
        });

        await waitFor(() => {
            expect(screen.getByTestId('welcome-text')).toHaveTextContent(LABELS.WELCOME_TEXT);
        });
    })
})