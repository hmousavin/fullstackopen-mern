import axios from 'axios';
const port = 3001;
const baseUrl = `http://localhost:${port}/api/persons`;

const getAll = () => {
    return axios.get(baseUrl)
                .then(response => response.data);
}

const create = newObject => {
    return axios.post(baseUrl, newObject)
                .then(true)
                .catch(false);
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
                .then(true)
                .catch(false);
}

const deleteOne = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
                .then(true)
                .catch(false);
}

const PersonsService = {
    getAll, create, update, deleteOne
};

export default PersonsService;