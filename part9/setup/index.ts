import express from 'express';
import { imc } from './bmiCalculator';
const app = express();

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


const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})