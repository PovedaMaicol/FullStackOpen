export interface Vuelo {
    id: number,
    date: string,
    weather: string,
    visibility: string,
    comment?: string
}

export type NewVuelo = Omit<Vuelo, 'id'>