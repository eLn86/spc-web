import axios from 'axios';

export const DICTIONARY_API_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en';

export const checkIfValidWord = async (word) => {
    try {
        return await axios.get(`${DICTIONARY_API_URL}/${word}`);
    } catch(error) {
        const { code, response } = error;
        if (code === 'ERR_BAD_REQUEST' && response.status === 404) {
            return response;
        }
        console.log(error);
    }
}

