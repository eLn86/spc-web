import axios from 'axios';
import { checkIfValidWord, DICTIONARY_API_URL } from "./dictionaryAPI";
describe('checkIfValidWord', () => {
    test('should return response for a valid word', async () => {
        const mockWord = 'test';
        const mockApiResponse = { status: 200 };
        axios.get = jest.fn().mockResolvedValue(mockApiResponse);

        const result = await checkIfValidWord(mockWord);
        expect(result).toEqual(mockApiResponse);
        expect(axios.get).toHaveBeenCalledWith(`${DICTIONARY_API_URL}/${mockWord}`);
    });

    test('should return response for an invalid word (404)', async () => {
        const mockWord = 'invalidas';
        const mockErrorResponse = {
            code: 'ERR_BAD_REQUEST',
            response: { status: 404 },
        };
        axios.get = jest.fn().mockRejectedValue(mockErrorResponse);

        const result = await checkIfValidWord(mockWord);
        expect(result).toEqual(mockErrorResponse.response);
        expect(axios.get).toHaveBeenCalledWith(`${DICTIONARY_API_URL}/${mockWord}`);
    });

    test('should log error for server errors other than 404', async () => {
        const mockWord = 'serverError';
        const mockErrorResponse = {
            code: 'ERR_INTERNAL_SERVER',
            response: { status: 500 },
        };
        axios.get = jest.fn().mockRejectedValue(mockErrorResponse);

        const consoleSpy = jest.spyOn(console, 'log');
        consoleSpy.mockImplementation(() => {});

        await checkIfValidWord(mockWord);

        expect(consoleSpy).toHaveBeenCalledWith(mockErrorResponse);

        // Restore the original console.log behavior
        consoleSpy.mockRestore();

        expect(axios.get).toHaveBeenCalledWith(`${DICTIONARY_API_URL}/${mockWord}`);
    });
});