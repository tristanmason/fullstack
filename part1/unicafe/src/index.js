import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css';

const Header = ({ title }) =>
        <h1>{title}</h1>

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
        {text}
    </button>
)

const Stats = ({ text, stat }) => (
    <p><strong>{text}:</strong> {stat}</p>
)

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div class="wrapper">
            <Header title="Provide Feedback" />
            <Button onClick={() => setGood(good + 1)} text="Good" />
            <Button onClick={() => setNeutral(neutral + 1)} text="Neutral" />
            <Button onClick={() => setBad(bad + 1)} text="Bad" />

            <Header title="Statistics" />
            <Stats text="Good" stat={good} />
            <Stats text="Neutral" stat={neutral} />
            <Stats text="Bad" stat={bad} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));