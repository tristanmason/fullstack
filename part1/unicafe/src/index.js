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
    const [allFeedback, setAll] = useState([])

    const handleGoodClick = () => {
        setGood(good + 1)
        setAll(allFeedback.concat(1))
    }

    const handleNeutralClick = () => {
        setNeutral(neutral + 1)
        setAll(allFeedback.concat(0))
    }

    const handleBadClick = () => {
        setBad(bad + 1)
        setAll(allFeedback.concat(-1))
    }

    const average = (array) => {
        if (array.length !== 0) {
            let total = array.reduce((sum, num) => sum + num)
            return total / array.length
        } else {
            return "-"
        }
    }

    const percentPositive = (positive, all) => {
        if (positive) {
            return ( (positive / all) * 100 ) + "%"
        } else {
            return "-"
        }
    }

    return (
        <div class="wrapper">
            <Header title="Provide Feedback" />
            <Button onClick={handleGoodClick} text="Good" />
            <Button onClick={handleNeutralClick} text="Neutral" />
            <Button onClick={handleBadClick} text="Bad" />

            <Header title="Statistics" />
            <Stats text="Good" stat={good} />
            <Stats text="Neutral" stat={neutral} />
            <Stats text="Bad" stat={bad} />
            <Stats text="All" stat={allFeedback.length} />
            <Stats text="Average" stat={average(allFeedback)} />
            <Stats text="Positive" stat={percentPositive(good, allFeedback.length)} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));