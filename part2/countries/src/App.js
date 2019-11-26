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
            placeholder="Start typing a country"
            onChange={handleSearchChange}
          />
        </p>
      </div>
    </form>
  )
}

const Country = ({ country }) => {
  return (
    <span className="countryName">
      {country.name}
    </span>
  )
}

const Button = ({ onClick, text, country }) => (
  <button onClick={onClick} data-country={country}>
    {text}
  </button>
)

const Info = ({ countryInfo }) => {
  const languages = () => {
    return (
      countryInfo.languages.map(language =>
        <li key={language.name}>
          {language.name}
        </li>
      )
    )
  }
  
  return (
    <div>
      <h2>{countryInfo.name}</h2>
      <p>
        Capital: {countryInfo.capital}<br />
        Population: {countryInfo.population}
      </p>
      <h3>Languages</h3>
      <ul>
        {languages()}
      </ul>
      <img
        className="flag"
        src={countryInfo.flag}
        alt="Flag"
      />
    </div>
  )
}

const Countries = ({ filteredCountries, handleShowClick }) => {

  const rows = () => {
    if (filteredCountries.length === 0) {

      return "No results"
    
    } else if (filteredCountries.length === 1) {
    
      return (
        <Info countryInfo={filteredCountries[0]} />
      )
    
    } else if (filteredCountries.length > 10) {
    
      return "Too many matches, please be more specific"
    
    } else if (filteredCountries.length > 1) {
    
      return (
        filteredCountries.map(country =>
          <div className="result" key={country.name}>
            <Country
              country={country}
            />
            <Button
              onClick={handleShowClick}
              text="Show"
              country={country.name}
            />
          </div>
        )
      )
    }
  }

  return (
        <div className="resultsWrapper">
          {rows()}
        </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchTerms, setSearchTerms] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const filteredCountries = searchTerms
    ? countries.filter(country => (new RegExp(searchTerms, 'i').test(country.name)))
    : countries

  const handleSearchChange = (event) => {
    setSearchTerms(event.target.value)
  }

  const handleShowClick = (event) => {
    setSearchTerms(event.target.getAttribute('data-country'))
  }

  return (
    <div className="wrapper">
      <h1>Country Info</h1>

      <Filter searchTerms={searchTerms} handleSearchChange={handleSearchChange} />

      <Countries filteredCountries={filteredCountries} handleShowClick={handleShowClick} />

    </div>
  )
}

export default App;
