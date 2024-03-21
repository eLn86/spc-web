import axios from 'axios';
import { REQUEST_HEADERS } from "./common";

export const BACKEND_API_URL = 'http://localhost:8080/api';

export const saveScore = async (data) => {
    const requestData = {
        score: data.score,
        word: data.word
    }
    try {
        return await axios.post(`${BACKEND_API_URL}/scores`, requestData, REQUEST_HEADERS);
    } catch(error) {
        console.log(error);
    }
}

export const getTopTenScores = async () => {
    try {
        return await axios.get(`${BACKEND_API_URL}/scores`, REQUEST_HEADERS);
    } catch(error) {
        console.log(error);
    }
}