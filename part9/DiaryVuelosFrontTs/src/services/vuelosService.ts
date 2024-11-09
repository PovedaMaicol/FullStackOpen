import axios from "axios";
import { Vuelo, NewVuelo } from "../types";

const baseUrl = 'http://localhost:3000/api/diaries'

export const getAllVuelos = async () => {
    try {
        const response = await axios.get<Vuelo[]>(baseUrl);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error.status)
            console.error(error.response);
        } else {
            console.error(error)
        }
        return undefined;
    }
}

export const createVuelo = async (object: NewVuelo): Promise<Vuelo | { error: string }> => {
    try {
        const response = await axios.post<Vuelo>(baseUrl, object);
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(`Error: ${error.message}`);
            console.error(error.response?.data)
            return {error: error.response?.data || 'error in request'};
        } else {
            console.error(`Error inesperado: ${error}`)
            return { error: "Unexpected error" };
        }
    }
}