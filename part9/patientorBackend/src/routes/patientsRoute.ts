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

routerPatient.get('/:id', (_req, res) => {
  const patient = patientsServices.findById(String(_req.params.id));

  if(patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
  
})

// POST /api/patients/:id/entries.
routerPatient.post('/:id/entries', (_req, res) => {
  const patient = patientsServices.findById(String(_req.params.id))

  if (!patient) {
    return res.status(404).send('Patient not found');
  }


  try {
    const newEntry = toNewEntry(_req.body);
    const addedEntry = patientsServices.addEntry(patient.id, newEntry)
    res.json(addedEntry);
  }catch (error) {
    res.status(400).send(error instanceof Error ? error.message : 'Error adding entry');
  }
})

export default routerPatient;