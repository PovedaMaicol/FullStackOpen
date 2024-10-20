import express from 'express';
import { imc } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();


// Se añadió app.use(express.json()) para asegurarnos de que Express pueda manejar correctamente los datos JSON en el cuerpo de las solicitudes POST.
app.use(express.json());

app.get('/ping', (_req, res) => {
    res.send('pong')
});

app.get('/hello', (_req, res) => {  
    res.send('Hello Full Stack!')
});

app.get('/bmi', (_req, res) => {
    const height = Number(_req.query.height);
    const weight = Number(_req.query.weight);
   

      // Validar que los parámetros estén presentes y sean números válidos
    if (!height || !weight || isNaN(height) || isNaN(weight)) {
    res.status(400).json({ error: "malformatted parametros" });
    }
    const resultado = imc(height, weight);
    res.json(resultado)
})

app.post('/exercises', (_req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = _req.body;

    // Validar que los parámetros estén presentes
    if (!daily_exercises || !target) {
        res.status(400).json({ error: 'parameters missing' });
    }

    // Validar que daily_exercises sea un array de números y que target sea un número
    if (
    !Array.isArray(daily_exercises) ||
    !daily_exercises.every((num) => typeof num === 'number') ||
    typeof target !== 'number'
    ) {
    res.status(400).json({ error: 'malformatted parameters' });
    }


    const result = calculateExercises(daily_exercises, target);

    res.send({result})


})


const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})