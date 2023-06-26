const PersonsComponent = ({persons, filter, deletePerson}) => {
  const lcFilter = filter.toLowerCase();
  const targetPersons = filter !== '' ? persons.filter(p => p.name.toLowerCase().match(lcFilter))
                                      : persons;
  return (
    <span> 
      {targetPersons.map((person, index) => 
        <div key={index}>
          <p>{person.name} {person.number}</p>
          <button onClick={e => deletePerson(person.id)}>delete</button>
        </div>
      )}
    </span>
  )
}

export default PersonsComponent;