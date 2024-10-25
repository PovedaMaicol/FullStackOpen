import express from 'express';
import cors from 'cors';
import diagnoseRouter from './routes/diagnosesRoute';
import patientRouter from './routes/patientsRoute'
const app = express();
app.use(express.json());
const PORT = 3000;

// Configura CORS para permitir solicitudes desde un origen específico
app.use(cors({
  origin: 'http://localhost:5173'  // Permitir solicitudes solo desde este origen
}));

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnoseRouter);

app.use('/api/patients', patientRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});