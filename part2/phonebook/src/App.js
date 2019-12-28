import React, { useState, useEffect } from 'react'
import personService from './services/persons'

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

const Persons = ({filteredPersons, handleDeleteClick}) => {
  const rows = () => filteredPersons.map(person =>
    <Person
      key={person.id}
      person={person}
      onDelete={handleDeleteClick}
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

const Person = ({ person, onDelete }) => {
  return (
    <tr>
      <td>{person.name} {person.phone} <button data-name={person.name} data-id={person.id} onClick={onDelete}>Delete</button></td>
    </tr>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [searchTerms, setSearchTerms] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const filteredPersons = searchTerms
    ? persons.filter(person => (new RegExp(searchTerms, 'i').test(person.name)))
    : persons

  const addName = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      phone: newPhone
    }

    const found = persons.find(person => (person.name === personObject.name))

    if (found) {
      if (window.confirm(`${newName} has already been added to your phonebook. Replace the old number with a new one?`)) {

        personService
          .update(found.id, personObject)
          .then(returnedPerson => {
              setPersons(persons.map(person => person.name !== newName ? person : returnedPerson))
          })
      }
    } else {
      personService
      .create(personObject)
      .then(data => {
        setPersons(persons.concat(data))
        setNewName('')
        setNewPhone('')
      })
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

  const handleDeleteClick = (event) => {
    let deleteConfirm = window.confirm(`Delete ${event.target.dataset.name}?`)
    const id = parseInt(event.target.dataset.id)
    if (deleteConfirm) {
      personService
        .destroy(id)
        .then( setPersons(persons.filter(p => p.id !== id)) )
    }
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

      <Persons filteredPersons={filteredPersons} handleDeleteClick={handleDeleteClick} />
    </div>
  )
}

export default App
