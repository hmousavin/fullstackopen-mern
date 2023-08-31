const filterReducer = (state = null, payload) => {
    let {action , state : all_states} = payload
    if (action && action.type === 'Filter') {
        
        console.log('before:', state)
        state = all_states.filter(s => s.content.includes(action.filter))
        console.log('after:', state)
    }

    return state
}

export const filterChange = (typedInput) => {
    return {
        type: 'Filter', 
        filter: typedInput
    }
}

export default filterReducer