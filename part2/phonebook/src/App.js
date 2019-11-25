import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ searchTerms, handleSearchChange }) => {
  return (
    <form>
      <div className="form-group">
        <p>
          <label htmlFor="addNameInput">
            Filter
              </label>
          <input
            name="searchInput"
            value={searchTerms}
            placeholder="Start typing a name"
            onChange={handleSearchChange}
          />
        </p>
      </div>
    </form>
  )
}

const PersonForm = ({ addName, newName, newPhone, handleNameChange, handlePhoneChange }) => {

  return (
    <form onSubmit={addName}>
      <div className="form-group">
        <p>
          <label htmlFor="addNameInput">
            Name
              </label>
          <input
            name="addNameInput"
            value={newName}
            onChange={handleNameChange}
          />
        </p>
        <p>
          <label htmlFor="addPhoneInput">
            Phone
              </label>
          <input
            name="addPhoneInput"
            value={newPhone}
            onChange={handlePhoneChange}
          />
        </p>
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  )
}

const Persons = ({filteredPersons}) => {
  const rows = () => filteredPersons.map(person =>
    <Person
      key={person.name}
      person={person}
    />
  )

  return (
    <table>
      <tbody>
        {rows()}
      </tbody>
    </table>
  )
}

const Person = ({ person }) => {
  return (
    <tr>
      <td>{person.name} {person.phone}</td>
    </tr>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [searchTerms, setSearchTerms] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const filteredPersons = searchTerms
    ? persons.filter(person => (new RegExp(searchTerms, 'i').test(person.name)))
    : persons

  const addName = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      phone: newPhone
    }

    if (persons.find(person => (person.name === personObject.name))) {
      alert(`${newName} has already been added to your phonebook`)
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewPhone('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchTerms(event.target.value)
  }

  return (
    <div className="wrapper">
      <h1>Phonebook</h1>

      <Filter searchTerms={searchTerms} handleSearchChange={handleSearchChange} />
      
      <h2>Add New</h2>

      <PersonForm
        addName={addName}
        newName={newName}
        newPhone={newPhone}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
      />

      <h2>Numbers</h2>

      <Persons filteredPersons={filteredPersons} />
    </div>
  )
}

export default App
