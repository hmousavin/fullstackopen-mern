export default function calculateBmi(height: number, weight: number): string {
    const index: number = (weight / ((height / 100) ** 2))
    switch (true) {
        case (index < 18.4):
            return 'Underweight'
        case (18.5 <= index && index <= 24.5):
            return 'Normal (healthy weight)'
        case (25 < index && index <= 39.9):
            return 'Overweight'
        case (40 <= index):
            return 'Obese'
        default:
            throw new Error(`Unexpected BMI index: ${index}`)
    }
}