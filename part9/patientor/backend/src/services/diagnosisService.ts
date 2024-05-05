import diagnosisData from '../../data/diagnoses';
import { Diagnose } from '../types';

const getDiagnosis = (): Diagnose[] => {
    return diagnosisData;
};

export {
    getDiagnosis
};