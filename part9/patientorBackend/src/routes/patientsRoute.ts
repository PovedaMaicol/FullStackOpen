import express from 'express';
import patientsServices from '../services/patientsServices';

const routerPatient = express.Router();

routerPatient.get('/', (_req, res) => {
    res.send(patientsServices.getNonSensitivePatientEntries());
  })

routerPatient.post('/', (_req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = _req.body;
  const addedEntry = patientsServices.addPatient(
    name,
    dateOfBirth,
    ssn, 
    gender,
    occupation,
  );
  res.json(addedEntry);
})

export default routerPatient;