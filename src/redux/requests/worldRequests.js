import axios from 'axios';

export function callWorlds() {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.get('/api/world', config)
    .then(response => response.data)
    .catch((error) => { throw error.response || error; });
}

export function postNewWorld(payload) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.post('/api/world', payload, config)
    .then(response => response)
    .catch((error) => { throw error.response || error; })
}

export function callWorldDetails(id) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.get(`/api/world/${id}`, config)
    .then(response => response.data[0])
    .catch((error) => { throw error.response || error })
}

export function editWorldDetails(action) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.put(`/api/world/${action.id}`, action.payload, config)
    .then(response => response)
    .catch((error) => {throw error.response || error });
}