import { Gender, Patient } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === "string" || text instanceof String;
};

const parseString = (value: unknown, field: string): string => {
    if (!value || !isString(value)) {
        throw new Error(`Incorrect or missing ${field}: ${value}`);
    }
    return value;
};

const isDate = (date: unknown): date is Date => {
    return date instanceof Date;
};

const parseDate = (value: string | Date, field: string): Date => {
    if (!value || (!isString(value) && !isDate(value)))
        throw new Error(`Incorrect or missing ${field}: ${value}`);

    return new Date(value);
};

const isGender = (param: unknown): param is Gender => {
    return Object.values(Gender).includes(param as Gender);
};

const parseGender = (value: unknown, field: string): Gender => {
    if (!value || !isString(value) || !isGender(value)) {
        throw new Error(`Incorrect or missing ${field}: ${value}`);
    }

    return value;
};

export const toNewPatient = (obj: unknown): Patient => {
    const casted = obj as Patient;
    return {
        name: parseString(casted.name, 'name'),
        ssn: parseString(casted.ssn, 'ssn'),
        dateOfBirth: parseDate(casted.dateOfBirth, 'dateOfBirth'),
        gender: parseGender(casted.gender, 'gender'), // we don't have parseGender
        occupation: parseString(casted.occupation, 'occupation')
    } as Patient;
};