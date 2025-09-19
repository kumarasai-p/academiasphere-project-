import axios from 'axios';

const API_URL = 'http://localhost:8080/api/students';

const getAll = () => {
    return axios.get(API_URL);
};

const create = (student) => {
    return axios.post(API_URL, student);
};

const update = (id, student) => {
    return axios.put(`${API_URL}/${id}`, student);
};

const remove = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

export default { getAll, create, update, remove };