import patients from '../../data/patients';
import { PatientEntry, NonSensitivePatientEntry, NewPatientEntry } from '../types';
import { v4 as uuidv4 } from 'uuid';

const getPatients = (): PatientEntry[] => {
    return patients;
}

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

export default {
    getPatients,
    getNonSensitivePatientEntries,
    addPatient,
    findById
};