import express from "express";
import { Operation, calculator } from "./calculator";
const app = express();

app.use(express.json());

app.get('/ping', (_req, res) => {
  res.send('tucu');
});

app.post('/calculate', (_req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { value1, value2, op } = _req.body;

    if ( !value1 || isNaN(Number(value1 || !value2 || isNaN(Number(value2)))) ) {
        res.status(400).send({ error: '...'});
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculator(Number(value1), Number(value2), op as Operation);
    res.send({ result })
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});