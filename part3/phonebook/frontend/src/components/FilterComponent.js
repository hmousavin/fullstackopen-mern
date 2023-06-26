const FilterComponent = ({setFilter}) => {
    return (
        <div>filter shown with <input onChange={(e) => setFilter(e.target.value)}></input></div>
    )
}

export default FilterComponent;