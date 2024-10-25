import express from 'express';
import patientsServices from '../services/patientsServices';

const routerPatient = express.Router();

routerPatient.get('/', (_req, res) => {
    res.send(patientsServices.getNonSensitivePatientEntries());
  })

export default routerPatient;