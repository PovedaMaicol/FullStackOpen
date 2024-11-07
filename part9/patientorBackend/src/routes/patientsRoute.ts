import express from 'express';
import patientsServices from '../services/patientsServices';
import toNewPatientEntry from '../utils';

const routerPatient = express.Router();

routerPatient.get('/', (_req, res) => {
    res.send(patientsServices.getNonSensitivePatientEntries());
  })

routerPatient.post('/', (_req, res) => {

  try {
    const newPatientEntry = toNewPatientEntry(_req.body);
    const addedEntry = patientsServices.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if(error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage)
  }
})

export default routerPatient;