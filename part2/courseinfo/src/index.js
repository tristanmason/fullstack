import React from 'react'
import ReactDOM from 'react-dom'

const Course = ({course}) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
        </div>
    )
}

const Header = ({course}) => {
    return (
        <h1>{course}</h1>
    )
}

const Content = ({parts}) => {
    const rows = () => parts.map(part =>
        <Part
            key={part.id}
            name={part.name}
            exercises={part.exercises}
        />
    )
    
    return (
        <div>
            {rows()}
        </div>
    )
}

const Part = ({name, exercises}) => {
    return (
        <p>
            {name} {exercises}
        </p>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
                id: 1
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
                id: 2
            },
            {
                name: 'State of a component',
                exercises: 14,
                id: 3
            }
        ]
    }

    return (
        <div>
            <Course course={course} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))