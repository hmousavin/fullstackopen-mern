import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
const app = express();
app.use(bodyParser.json())

app.get('/ping', (_req: Request, res: Response) => {
    res.send('pong');
});

app.get('/bmi', (req: Request, res: Response) => {
    const { height, weight } = req.query
    if (height && weight) {
        res.send({
            height: height,
            weight,
            bmi: calculateBmi(Number(height), Number(weight))
        }).end()
    }
    else
        res.send({
            error: "malformatted parameters"
        })
})

app.post('/exercises', (req: Request, res: Response) => {
    console.log('the req.body: ', req.body)
    const { dailyExercises, target } = req.body
    if (dailyExercises && target)
        res.status(200).send(calculateExercises(JSON.parse(dailyExercises), target))
    else
        res.status(400).send({
            error: "parameters missing"
        })
})

const PORT = 3003;

app.listen(PORT, () => {
    console.log('Hello Full Stack!');
});