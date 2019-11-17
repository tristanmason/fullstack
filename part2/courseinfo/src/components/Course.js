import React from 'react'

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
        </div>
    )
}

const Header = ({ course }) => {
    return (
        <h1>{course}</h1>
    )
}

const Content = ({ parts }) => {
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
            <Sum parts={parts} />
        </div>
    )
}

const Part = ({ name, exercises }) => {
    return (
        <p>
            {name} {exercises}
        </p>
    )
}

const Sum = ({ parts }) => {

    const total = parts.reduce((s, p) => s + p.exercises, 0)

    return (
        <strong>Total of {total} exercises</strong>
    )
}

export default Course