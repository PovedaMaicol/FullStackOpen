import express from 'express';
import diaryService from '../services/diaryService';
import { NewDiaryEntry } from '../types';
import toNewDiaryEntry from '../utils';

const router = express.Router();

router.get('/:id', (_req, res) => {
  const diary = diaryService.findById(Number(_req.params.id));

  if (diary) {
  res.send(diary);
  } else {
  res.sendStatus(404);
  }
})

router.get('/', (_req, res) => {
  res.send(diaryService.getNonSensitiveEntries());
})

router.post('/', (_req, res) => {
  try {
    const newDiaryEntry = toNewDiaryEntry(_req.body);

    const addedEntry = diaryService.addDiary(newDiaryEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if(error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
  const { date, weather, visibility, comment } = _req.body;
  const newEntry: NewDiaryEntry = {
    date,
    weather,
    visibility,
    comment,
  };
  const addedEntry = diaryService.addDiary(newEntry);
  res.json(addedEntry);
})



export default router;