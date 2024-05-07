type NewDiaryProps = {
    submitCallback: (event: React.FormEvent) => void;
    notification: string;
};

const NewDiary = (props: NewDiaryProps) => {
    return (
        <form onSubmit={props.submitCallback}>
            <h2>Add new entry:</h2>
            <div style={{ color: "red" }}>{props.notification}</div>
            <input name="selected-date" type="date" />
            <br />
            <input type="radio" name="selected-weather" id="rainy" value="rainy" />
            <label htmlFor="rainy">rainy</label>
            <input type="radio" name="selected-weather" id="sunny" value="sunny" />
            <label htmlFor="sunny">sunny</label>
            <input type="radio" name="selected-weather" id="windy" value="windy" />
            <label htmlFor="windy">windy</label>
            <input type="radio" name="selected-weather" id="cloudy" value="cloudy" />
            <label htmlFor="cloudy">cloudy</label>
            <br />

            <input type="radio" name="selected-visibility" id="poor" value="poor" />
            <label htmlFor="poor">poor</label>
            <input type="radio" name="selected-visibility" id="good" value="good" />
            <label htmlFor="good">good</label>

            <br />
            <input name="typed-comment" type="text" placeholder="your comment .." />
            <br />
            <button type='submit'>Add</button>
        </form>
    )
}

export default NewDiary