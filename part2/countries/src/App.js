import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ searchTerms, handleSearchChange }) => {
  return (
    <form>
      <div className="form-group">
        <p>
          <label htmlFor="addNameInput">
            Find Countries
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

const Weather = ({ city, weather }) => {

  return (
    <div className="countryWeather">
      <h2>Weather in {city}</h2>
      <img src={weather.weather_icons} alt="weather icon" />
      <p>{weather.weather_descriptions}</p>
      <p><b>temperature: </b>{weather.temperature} Celsius</p>
      <p><b>wind: </b>{weather.wind_speed} kph direction {weather.wind_dir}</p>
    </div>
  )

}

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
    <div className="countryInfo">
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

const Countries = ({ filteredCountries, handleShowClick, handleCountrySelect, weather }) => {

  const rows = () => {
    if (filteredCountries.length === 0) {

      return "No results"
    
    } else if (filteredCountries.length === 1) {
      handleCountrySelect(filteredCountries[0])
    
      return (
        <div className="infoWrapper">
          <Info countryInfo={filteredCountries[0]} />
          <Weather city={filteredCountries[0].capital} weather={weather} />
        </div>
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
  const [selectedCountry, setSelectedCountry] = useState([])
  const [searchTerms, setSearchTerms] = useState('')
  const [weather, setWeather] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    if (selectedCountry.length !== 0) {
      console.log(selectedCountry)
      const city = selectedCountry.capital
      const baseUrl = 'http://api.weatherstack.com/current?access_key='
      const accessKey = '40127fb36d15b56f0fb54b4d83e3624c'
      const cityEncoded = encodeURIComponent(city.replace(/[.,]/g, ""))

      axios
        .get(`${baseUrl}${accessKey}&query=${cityEncoded}`)
        .then(response => {
          setWeather(response.data.current)
          console.log(response.data.current)
        })
      }
  }, [selectedCountry])

  const filteredCountries = searchTerms
    ? countries.filter(country => (new RegExp(searchTerms, 'i').test(country.name)))
    : countries

  const handleSearchChange = (event) => {
    setSearchTerms(event.target.value)
  }

  const handleShowClick = (event) => {
    setSearchTerms(event.target.getAttribute('data-country'))
  }

  const handleCountrySelect = (country) => {
    setSelectedCountry(country)
  }

  return (
    <div className="wrapper">
      <h1>Country Info</h1>
      <Filter searchTerms={searchTerms} handleSearchChange={handleSearchChange} />
      <Countries filteredCountries={filteredCountries} handleShowClick={handleShowClick} handleCountrySelect={handleCountrySelect} weather={weather} />
    </div>
  )
}

export default App;
