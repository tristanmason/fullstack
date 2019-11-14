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

const Statistic = ({ text, stat }) => (
    <p><strong>{text}:</strong> {stat}</p>
)

const Statistics = ({good, neutral, bad, allFeedback}) => {
    const average = (array) => {
        let total = array.reduce((sum, num) => sum + num)
        return total / array.length
    }

    const percentPositive = (positive, all) => ((positive / all) * 100) + "%"

    if (allFeedback.length > 0) {
        return (
            <>
                <Statistic text="Good" stat={good} />
                <Statistic text="Neutral" stat={neutral} />
                <Statistic text="Bad" stat={bad} />
                <Statistic text="All" stat={allFeedback.length} />
                <Statistic text="Average" stat={average(allFeedback)} />
                <Statistic text="Positive" stat={percentPositive(good, allFeedback.length)} />
            </>
        )
    } else {
        return (
            <>
                <p>No feedback given</p>
            </>
        )
    }
}

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

    return (
        <div className="wrapper">
            <Header title="Provide Feedback" />
            <Button onClick={handleGoodClick} text="Good" />
            <Button onClick={handleNeutralClick} text="Neutral" />
            <Button onClick={handleBadClick} text="Bad" />

            <Header title="Statistics" />
            <Statistics good={good} neutral={neutral} bad={bad} allFeedback={allFeedback} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));