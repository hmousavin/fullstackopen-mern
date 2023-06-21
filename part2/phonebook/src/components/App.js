import { useEffect, useState } from 'react'
import FilterComponent from './FilterComponent';
import PersonFormComponent from './PersonFormComponent';
import PersonsComponent from './PersonsComponent';
import Notification from './NotificationComponent';
import PersonsService from '../services/persons';

const App = () => {
  const [persons,   setPersons  ] = useState([]);
  const [newName,   setNewName  ] = useState('');
  const [newNumber, setNewNumber] = useState(0);
  const [filter,    setFilter   ] = useState('');
  const [message,   setMessage]   = useState({caption: '', type: ''});

  useEffect((message) => {
    PersonsService.getAll()
                  .then(response => {
                    setPersons(response)
                  })
                  .catch(error => {
                    console.log(error);
                    setMessage({caption: 'unable to retrieve all persons', type: 'failure'})
                  })

    setInterval(() => {
      if (message !== '')
        setMessage({caption: '', type: undefined});
    }, 3000);
  }, []); // empty array means only run once
  
  const addPerson = (event) => {
    event.preventDefault();
    
    if (newName !== '' && newNumber !== '') {
      if (!persons.map(p => p.name).includes(newName)) {
        const newPerson = {
            "name":   newName, 
            "number": newNumber,
            "id":     persons.length + 1
        };
        PersonsService.create(newPerson)
                      .then(() => {
                        setPersons(persons.concat(newPerson));
                        setMessage({caption:`Added ${newName}`, type:'success'});
                      })
                      .catch(error => {
                        console.log(error);
                      });
      }
      else if (!persons.map(p => p.number).includes(newNumber)) {
        let p = {...persons.find(p => p.name === newName)};
        if (window.confirm(`${p.name} is already added to phonebook, replace the old number with a new one?`)) {

          let modifedPersons = [...persons];
          const index = modifedPersons.findIndex(m => m.id === p.id);
          modifedPersons[index].number = newNumber;

          PersonsService.update(p.id, p)
                        .then(() => {
                          setPersons(modifedPersons);
                          setMessage({caption:`Number of ${newName} updated`, type:'success'});
                        })
                        .catch((error) => {
                          console.log(error);
                        });
        }
      }
      else
        setMessage({caption:`${newName} is already added to phonebook`, type:'warning'});
    }
    else
      setMessage({caption:'check your input before submit, please', type:'warning'});
  }

  const deletePerson = (id) => {
    const {name} = persons.find(p => p.id === id);
    if (window.confirm(`Delete ${name}?`))
      PersonsService.deleteOne(id)
                    .then(() => {
                      setPersons(persons.filter(p => p.id !== id));
                      setMessage({caption:`${name} removed`, type:'success'});
                    })
                    .catch((error) => {
                      console.log(error)
                      setMessage({caption:'unable to delete person', type:'failure'})
                    });
  }

  return (
    <div className='root'>
      <h2>Phonebook</h2>
      <Notification caption={message.caption} type={message.type}/>

      <FilterComponent setFilter={setFilter}/>
      
      <h2>add a new</h2>
      <PersonFormComponent setNewName={setNewName} setNewNumber={setNewNumber} addPerson={addPerson}/>
      
      <h2>Numbers</h2>
      <PersonsComponent persons={persons} filter={filter} deletePerson={deletePerson}/>
    </div>
  )
}

export default App;