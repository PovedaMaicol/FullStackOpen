import axios from "axios";
import { Vuelo, NewVuelo } from "../types";

const baseUrl = 'http://localhost:3000/api/diaries'

export const getAllVuelos = () => {
    return axios
    .get<Vuelo[]>(baseUrl)
    .then(response => response.data)
}

export const createVuelo = (object: NewVuelo) => {
    return axios
    .post<Vuelo>(baseUrl, object)
    .then(response => response.data)
}