import { Diary } from "../types";

type DiariesProps = {
    diaries: Diary[];
};

const Diaries = (props: DiariesProps) => {
    return (
        <main>
            <h2>Diariy entries:</h2>
            <br />
            {props.diaries.map((d, i) => (
                <div key={i}>
                    <div><strong>{d.date.toString()}</strong></div>
                    <br />
                    <div>visibility: {d.visibility}</div>
                    <div>weather: {d.weather}</div>
                    <br />
                </div>
            ))}
        </main>
    )
};

export default Diaries