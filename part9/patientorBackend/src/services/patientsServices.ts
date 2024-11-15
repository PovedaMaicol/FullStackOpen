import patients from '../../data/patients';
import { PatientEntry, NonSensitivePatientEntry, NewPatientEntry, EntryWithoutId, Entry } from '../types';
import { v4 as uuidv4 } from 'uuid';

const getPatients = (): PatientEntry[] => {
    return patients;
}

export const getPatientById = (id: string): PatientEntry | undefined => {
    return patients.find((patient) => patient.id === id);
  };

const getNonSensitivePatientEntries = (): NonSensitivePatientEntry[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
}

const addPatient = ( entry: NewPatientEntry ): PatientEntry => {

    const newPatientEntry = {
    id: uuidv4(),
    ...entry
    }

    patients.push(newPatientEntry);
    return newPatientEntry;

}

const findById = (id: string): PatientEntry | undefined => {
    const patient = patients.find(p => p.id === id);
    return patient;
}

//
const addEntry = (patientId: string, entry: EntryWithoutId ): Entry => {
    const patient = patients.find(p => p.id === patientId);
    if(!patient) {
        throw new Error('Patient not found');
    }

    console.log("Datos recibidos para agregar la entrada:", entry);

const newEntry: Entry = {
    ...entry, 
    id: uuidv4(),
    diagnosisCodes: entry.diagnosisCodes && entry.diagnosisCodes.length > 0 
            ? entry.diagnosisCodes 
            : [] // Si no tiene diagnosisCodes, asignar un array vacío
};

console.log("Nueva entrada antes de agregarla:", newEntry);

// if (newEntry.type === "Hospital" && 'diagnosisCodes' in newEntry && !newEntry.diagnosisCodes) {
    // newEntry.diagnosisCodes = [];
// }
patient.entries.push(newEntry)
return newEntry;
}

export default {
    getPatients,
    getNonSensitivePatientEntries,
    addPatient,
    findById,
    addEntry
};