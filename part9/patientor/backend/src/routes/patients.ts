import express from 'express';
import { addPatient, getPatients } from '../services/patientsService';
import { toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(getPatients());
});

router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);
        const addedPatient = addPatient(newPatient);
        res.send(addedPatient);
    } catch (error: unknown) {
        let errorMessage = "Something went wrong.";
        if (error instanceof Error)
            errorMessage += ` Error: ${error.message}`;

        res.status(400).send(errorMessage);
    }
});

export default router;