import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 'Arto Hellas' },
    { name: 'Ada Lovelace', id: 'Ada Lovelace' }
  ])
  const [newName, setNewName] = useState('')

  const Person = ({ person }) => {
    return (
      <tr>
        <td>{person.name}</td>
      </tr>
    )
  }

  const rows = () => persons.map(person =>
    <Person
      key={person.name}
      person={person}
    />
  )

  const addName = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      id: newName
    }

    if (persons.find(person => (person.id === personObject.id)))
    {
      alert(`${newName} has already been added to your phonebook`)
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div className="wrapper">
      <h1>Phonebook</h1>
      <form onSubmit={addName}>
        <div className="form-group">
          <label htmlFor="addNameInput">
            Name
          </label>
          <input
            name="addNameInput"
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <table>
        <tbody>
          {rows()}
        </tbody>
      </table>
      
      <p>debug: {newName}</p>
    </div>
  )
}

export default App
