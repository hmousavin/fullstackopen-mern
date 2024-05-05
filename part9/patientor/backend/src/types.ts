export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: Date;
    ssn: string;
    gender: Gender;
    occupation: string;
}

export type PatientInfo = Omit<Patient, 'ssn'>;

export type NewPatent = Omit<Patient, 'id'>;