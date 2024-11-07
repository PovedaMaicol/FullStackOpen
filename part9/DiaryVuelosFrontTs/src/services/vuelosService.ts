import axios from "axios";
import { Vuelo } from "../types";

const baseUrl = 'http://localhost:3000/api/diaries'

export const getAllVuelos = () => {
    return axios
    .get<Vuelo[]>(baseUrl)
    .then(response => response.data)
}