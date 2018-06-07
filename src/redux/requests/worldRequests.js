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
  console.log("ERMAGERD", payload);
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

  console.log('HERE BE THE BEER', id)

  return axios.get(`/api/world/${id}`, config)
    .then(response => response.data[0])
    .catch((error) => { throw error.response || error })
}