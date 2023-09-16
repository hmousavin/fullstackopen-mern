import axios from "axios"

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (newContent) => {
    const object = {
        "content": newContent,
        "id": (100000 * Math.random()).toFixed(0),
        "votes": 0
    }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const updateOne = async (updatingObject) => {
    const response = await axios.put(`${baseUrl}/${updatingObject.id}`, updatingObject)
    return response.data
}

export default { getAll, createNew, updateOne }