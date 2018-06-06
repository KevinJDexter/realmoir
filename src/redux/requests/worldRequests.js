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
    .then(response => console.log(response))
    .catch((error) => { throw error.response || error; })
}