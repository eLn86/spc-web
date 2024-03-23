import * as scoresAPI from "../../apis/scoresAPI";
import { act, findAllByText, render, screen } from "@testing-library/react";
import TopScores from "./TopScores";
import '../../setupDomTests';
import { TABLE_ROLES } from "../../constants";
import React from "react";

jest.mock("../../apis/scoresAPI");

jest.mock('axios');

beforeEach(async () => {
    const mockScores = {
        data: {
            scores: [
                { word: 'example', score: 10 },
                { word: 'example', score: 10 },
                { word: 'magnum', score: 8 }
            ]
        }
    };
    scoresAPI.getTopTenScores.mockResolvedValue(mockScores);
});
describe('TopScores Page UI', () => {
    test('renders header text', async () => {
        await act(async () => render(<TopScores/>));
        const headerText = screen.getByText(/top 10 scores/i);
        expect(headerText).toBeInTheDocument();
    });

    test('render table with Word and Score columns', async () => {
        await act(async () => render(<TopScores/>));
        const table = screen.getByTestId('score-table');
        expect(table).toBeInTheDocument();
        const headerCellWithWordText = screen.getByRole(TABLE_ROLES.COLUMN_HEADER, { name: 'Word Submitted' });
        const headerCellWithScoreText = screen.getByRole(TABLE_ROLES.COLUMN_HEADER, { name: 'Score Attained' });
        expect(headerCellWithWordText).toBeInTheDocument();
        expect(headerCellWithScoreText).toBeInTheDocument();
    })

    test('renders top scores page with data provided by API (mocked)', async () => {
        await act(async () => render(<TopScores/>));
        expect(await screen.findByText('magnum')).toBeVisible();
    })

    test('remaining number of slots to be 10 - apiData.length (length is mocked to be 3)', async () => {
        const { findAllByText } = await act(async () => render(<TopScores/>));
        expect(await findAllByText('This slot has yet to be filled!')).toHaveLength(7);
    })

    test('render 10 slots with This slot has yet to be filled! when no api.data', async () => {
        const mockScores = {
            data: {
                scores: []
            }
        };
        scoresAPI.getTopTenScores.mockResolvedValue(mockScores);
        const { findAllByText } = await act(async () => render(<TopScores/>));
        expect(await findAllByText('This slot has yet to be filled!')).toHaveLength(10);
    })
})