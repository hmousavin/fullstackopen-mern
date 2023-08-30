const filterReducer = (state = null, action) => {
    if (action.type === 'Filter')
        return action.filter

    return state
}

export const filterChange = (typedInput) => {
    return {
        type: 'Filter', 
        filter: typedInput
    }
}

export default filterReducer