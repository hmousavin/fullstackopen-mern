import React, { useState } from 'react';

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  );
};

const FeedbackButtons = ({ handleGood, handleNeutral, handleBad }) => {
  return (
    <div>
      <h2>Give feedback</h2>
      <Button handleClick={handleGood} text="Good" />
      <Button handleClick={handleNeutral} text="Neutral" />
      <Button handleClick={handleBad} text="Bad" />
    </div>
  );
};

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}{props.operator}</td>
    </tr>
  );
};

const Statistics = (props) => {
  const { good, neutral, bad } = props;

  if (good !== 0 || neutral !== 0 || bad !== 0) {
    return (
      <div>
        <h2>Statistics</h2>
        <table>
          <tbody>
            <StatisticLine text="Good"    value={good} />
            <StatisticLine text="Neutral" value={neutral} />
            <StatisticLine text="Bad"     value={bad} />

            <StatisticLine text="All"      value={good + neutral + bad} />
            <StatisticLine text="Average"  value={good - bad} />
            <StatisticLine text="Positive" value={((good * 100) / (good + neutral + bad)).toFixed(2) || 0} operator="%" />
          </tbody>
        </table>
      </div>
    );
  } 
  else {
    return (
      <div>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </div>
    );
  }
};

const App = () => {
  // save clicks of each button to its own state
  const [good,    setGood]    = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad,     setBad]     = useState(0);

  const handleGood    = () => { setGood(good + 1);       };
  const handleNeutral = () => { setNeutral(neutral + 1); };
  const handleBad     = () => { setBad(bad + 1);         };

  return (
    <div>
      <FeedbackButtons
        handleGood={handleGood}
        handleNeutral={handleNeutral}
        handleBad={handleBad}
      />
      <hr />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;