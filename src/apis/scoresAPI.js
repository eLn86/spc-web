import { REQUEST_HEADERS } from "./common";
import axios from "axios";

export const BACKEND_API_URL = 'http://localhost:8080/api';

export const saveScore = async (data) => {
    const requestData = {
        score: data.score,
        word: data.word
    }
    const response = await axios.post(`${BACKEND_API_URL}/scores`, requestData, REQUEST_HEADERS);
    return response.data;
}

export const getTopTenScores = async () => {
    const response = await axios.get(`${BACKEND_API_URL}/scores`, REQUEST_HEADERS);
    return response.data;
}