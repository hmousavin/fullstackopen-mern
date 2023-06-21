import { useEffect, useState } from 'react'
import axios from 'axios';

const Notification = ({message}) => {
  if (message !== '')
    return (
      <p>{message}</p>
    )

  return null;
}

const Candidates = ({candidates, showSelectedCountry}) => {
  return (
    <span>
      { candidates.map(candidate => {
          return (
            <span key={candidate}>
              <p>{candidate}</p>
              <button onClick={() => showSelectedCountry(candidate)}>show</button>
            </span>
          )
      }) }
    </span>
  )
}

const Country = ({country}) => {
  if (country !== undefined && country !== '') {
    const {name, capital, area, flags } = country;
    const languages = [...Object.values(country.languages)]
    return (
      <div key={name.common}>
          <h2>{name.common}</h2> 
          <p>capital {capital}</p>
          <p>area {area}</p>
          <h4>languages:</h4>
          <ul>
            {languages.map(l => <li>{l}</li>)}
          </ul>
          <img src={flags.png} alt={name.common}/>
      </div>
    )
  }

  return null;
}

const App = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [message,      setMessage]      = useState('');
  const [candidates,   setCandidates]   = useState([]);
  const [country,      setCountry]      = useState('');

  useEffect(() => {
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
         .then(response => {
            setAllCountries(response.data);
         })
         .catch(error => {
            console.log(error);
         })
  }, []); // empty array means only run once

  const serachCountryByName = (event) => {
    setMessage('');
    setCandidates([]);
    setCountry('')

    const filter = event.target.value.toLowerCase();
    if (filter !== undefined && filter !== '') {
      const filteredCountries = allCountries.map(c => c.name.common.toLowerCase())
                                            .filter(c => c.includes(filter));
      
      if (filteredCountries !== undefined) {
        if (filteredCountries.length === 1) {
          const index = allCountries.findIndex(c => c.name.common.toLowerCase() === filteredCountries[0]);
          setCountry(allCountries[index]);
        }
        else if (filteredCountries.length > 5) {
          setMessage('Too many matches, specify another filter');
        }
        else
          setCandidates(filteredCountries);
      }
    }
  }

  const showSelectedCountry = (selectedCountry) => {
    // if (selectedCountry !== undefined ){
      
      const index = allCountries.findIndex(c => c.name.common.toLowerCase() === selectedCountry.toLowerCase());
      if (index !== -1) {
        setMessage('');
        setCandidates([]);

        setCountry(allCountries[index]);
      }
    // }
  }

  return (
    <div className='root'>
      <span>find contries </span>
      <input type='text' placeholder='put your country name, here' onInput={serachCountryByName}></input>
      <Notification message={message}/>
      <Candidates candidates={candidates} showSelectedCountry={showSelectedCountry}/>
      <Country country={country}/>
    </div>
  )
}

export default App;