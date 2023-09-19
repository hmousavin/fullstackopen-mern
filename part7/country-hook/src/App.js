import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (namedCountry) => {
  const [country, setCountry] = useState(null)
  
  useEffect(() => {
    const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name'
    const fetchData = async () => {
      try {
        const {data} = await axios.get(`${baseUrl}/${namedCountry}`) // .then(res => res.data)

        setCountry({
          name: data.name.common,
          capital: data.capital[0],
          population: data.population,
          flag: data.flags.png,
        })
      } catch (error) {
        console.error('Error fetching country data:', error);
        setCountry(null);
      }
    }

    if (namedCountry) {
      fetchData()
    }
  }, [namedCountry])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (typeof country === undefined) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.name} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div> 
      <img src={country.flag} height='100' alt={`flag of ${country.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(nameInput.value)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App