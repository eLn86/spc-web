import axios from 'axios';
import { WordNotFoundError } from "../errorHandling";

export const DICTIONARY_API_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en';

export const checkIfValidWord = async (word) => {
    try {
        const result = await axios.get(`${DICTIONARY_API_URL}/${word}`);
        return result;
    } catch(error) {
        const { code, response } = error;
        if (code === 'ERR_BAD_REQUEST' && response.status === 404) {
            return response;
        }
        console.log(error);
    }
}

