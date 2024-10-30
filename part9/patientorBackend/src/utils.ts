import { NewPatientEntry, Gender } from "./types";

//IMPORTANTE
// esta funcion es una guardia de tipo, deveuelve un booleano 
// esta funcion tiene un predicado: 'text is string'
// la forma de un predicado es 'parameterName is Type'
//parameterName: el nombre del parametro
//Type: es el tipo objetivo
const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
}

const parseName = (name: unknown): string => {
    if(!name || !isString(name)) {
        throw new Error('Incorrect or missing name')
    }
    return name;
}


const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date))
}

const parseDate = (date: unknown): string => {
    if(!date || !isString(date) || !isDate(date))  {
        throw new Error('Incorrect or missing date: ' +  date)
    }
    return date;
}

const isSsn = (ssn: unknown): ssn is string => {
    return typeof ssn === 'string' || ssn instanceof String;
}

const parseSsn = (ssn: unknown): string => {
    if(!ssn || !isSsn(ssn)) {
        throw new Error('Incorrect or missing ssn')
    }
    return ssn;
}



const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param)
};

const parseGender = (gender: unknown): Gender => {
    if(!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect gender ' + gender);
    }
    return gender;
}



const isOccupation = (txt: unknown): txt is string => {
    return typeof txt === 'string' || txt instanceof String;
}

const parseOccupation = (occupation: unknown): string => {
    if(!occupation || !isOccupation(occupation)) {
        throw new Error('Incorrect or missing occupation')
    }
    return occupation;
}


const toNewPatientEntry = (object: unknown): NewPatientEntry => {

    if(!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if('occupation' in object && 'gender' in object && 'ssn' in object && 'dateOfBirth' in object && 'name' in object){
        const newEntry: NewPatientEntry = {
            name: parseName(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseSsn(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation)
        };

        return newEntry;
    } 
   
    throw new Error('Incorrect data: some fields are missing');
}

export default toNewPatientEntry;