import axios from 'axios';
import { saveScore, getTopTenScores, BACKEND_API_URL } from "./scoresAPI";
import { REQUEST_HEADERS } from "./common";
describe('saveScore', () => {
    test('should return successful response when word and score provided', async () => {
        const mockWord = 'ludicrous';
        const mockScore = 12;
        const mockData = {
            score: mockScore,
            word: mockWord
        }
        const mockApiResponse = {
            id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            word: mockWord,
            score: mockScore
        };
        axios.post = jest.fn().mockResolvedValue(mockApiResponse);

        const result = await saveScore(mockData);
        expect(result).toEqual(mockApiResponse);
        expect(axios.post).toHaveBeenCalledWith(`${BACKEND_API_URL}/scores`, mockData, REQUEST_HEADERS);
    });

    test('should log error for server errors', async () => {
        const mockWord = 'ludicrous';
        const mockScore = 12;
        const mockData = {
            score: mockScore,
            word: mockWord
        }
        const mockErrorResponse = {
            code: 'ERR_INTERNAL_SERVER',
            response: { status: 500 },
        };
        axios.post = jest.fn().mockRejectedValue(mockErrorResponse);

        const consoleSpy = jest.spyOn(console, 'log');
        consoleSpy.mockImplementation(() => {});

        await saveScore(mockData);

        expect(consoleSpy).toHaveBeenCalledWith(mockErrorResponse);

        // Restore the original console.log behavior
        consoleSpy.mockRestore();

        expect(axios.post).toHaveBeenCalledWith(`${BACKEND_API_URL}/scores`, mockData, REQUEST_HEADERS);
    });
});

describe('getTopScores', () => {
    test('should return successful response with scores', async () => {
        const mockApiResponse = {
            "scores": [
                {
                    "id": "b24d46f6-b2df-4734-b652-1e3d3613260e",
                    "word": "damsel",
                    "score": 9
                },
                {
                    "id": "aa255d3f-e016-4fe8-af43-2d968255fb74",
                    "word": "slash",
                    "score": 8
                }
            ]
        };
        axios.get = jest.fn().mockResolvedValue(mockApiResponse);

        const result = await getTopTenScores();
        expect(result).toEqual(mockApiResponse);
        expect(axios.get).toHaveBeenCalledWith(`${BACKEND_API_URL}/scores`, REQUEST_HEADERS);
    });

    test('should log error for server errors', async () => {
        const mockErrorResponse = {
            code: 'ERR_INTERNAL_SERVER',
            response: { status: 500 },
        };
        axios.get = jest.fn().mockRejectedValue(mockErrorResponse);

        const consoleSpy = jest.spyOn(console, 'log');
        consoleSpy.mockImplementation(() => {});

        await getTopTenScores();

        expect(consoleSpy).toHaveBeenCalledWith(mockErrorResponse);

        // Restore the original console.log behavior
        consoleSpy.mockRestore();

        expect(axios.get).toHaveBeenCalledWith(`${BACKEND_API_URL}/scores`, REQUEST_HEADERS);
    });
});