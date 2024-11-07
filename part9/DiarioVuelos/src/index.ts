import express from 'express';
import cors from 'cors';
import diaryRouter from './routes/diaries';
const app = express();
app.use(express.json());

const PORT = 3000;

// Configura CORS para permitir solicitudes desde un origen específico
app.use(cors({
    origin: 'http://localhost:5173'
}));

app.get('/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});

app.use('/api/diaries', diaryRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});