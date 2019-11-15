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

const Anecdote = ({ anecdotes, selected, votes }) => (
    <p>
        {anecdotes[selected]}<br/>
        has {votes[selected]} votes
    </p>
)

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0))

    const randomNumber = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    }

    const handleNextClick = () => {
        let number = randomNumber(props.anecdotes.length)
        setSelected(number)
    }

    const handleVoteClick = () => {
        const votesCopy = [...votes]
        votesCopy[selected] += 1
        setVotes(votesCopy)
    }

    const mostVotes = (votesArray) =>
        votesArray.indexOf(Math.max(...votesArray));

    return (
        <div>
            <Header title="Anecdote of the Day" />
            <Anecdote anecdotes={props.anecdotes} selected={selected} votes={votes} />
            <Button onClick={handleVoteClick} text="Vote" />
            <Button onClick={handleNextClick} text="Next Anecdote" />

            <Header title="Anecdote with the Most Votes" />
            <Anecdote anecdotes={props.anecdotes} selected={mostVotes(votes)} votes={votes} />
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)
