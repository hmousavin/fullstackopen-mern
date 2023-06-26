const PersonFormComponent = ({setNewName, setNewNumber, addPerson}) => {
    return (
        <form>
            <div>
            <div>name: <input onChange={e => setNewName(e.target.value)}/></div>
            <div>number: <input onChange={e => setNewNumber(e.target.value)}></input></div>
            </div>
            <div>
            <button type="submit" onClick={e => addPerson(e)}>add</button>
            </div>
        </form>
    )
}

export default PersonFormComponent;