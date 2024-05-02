interface ExerciseResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

export default function calculateExercises(exerciseHours: number[], targetHours: number): ExerciseResult {
    const periodLength = exerciseHours.length;
    const trainingDays = exerciseHours.filter(hours => hours > 0).length;
    const totalHours = exerciseHours.reduce((sum, hours) => sum + hours, 0);
    const average = totalHours / periodLength;
    const success = average >= targetHours;

    let rating: number;
    let ratingDescription: string;
    if (average >= targetHours * 1.2) {
        rating = 3;
        ratingDescription = 'excellent';
    } else if (average >= targetHours * 0.8) {
        rating = 2;
        ratingDescription = 'not too bad but could be better';
    } else {
        rating = 1;
        ratingDescription = 'needs improvement';
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target: targetHours,
        average: parseFloat(average.toFixed(6)), // Round to 6 decimal places
    };
}