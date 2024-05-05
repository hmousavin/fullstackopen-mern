import patientsData from '../../data/patients';
import { NewPatent, Patient, PatientInfo } from '../types';
import { v1 as uuid } from 'uuid';
const newId = uuid();

const getPatients = (): PatientInfo[] => {
    return patientsData.map(({ ssn, ...patientWithoutSSN }) => patientWithoutSSN);
};

const addPatient = (patient: NewPatent): Patient => {
    const id = newId;
    const newPatient = { ...patient, id };
    patientsData.push(newPatient);
    return newPatient;
};

export {
    getPatients,
    addPatient
};