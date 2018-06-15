import axios from 'axios';

export function callLore() {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.get('/api/lore', config)
    .then(response => response.data)
    .catch((error) => { throw error.response || error; });
}

export function callLoreDetails(id) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.get(`/api/lore/${id}`, config)
    .then(response => response.data[0])
    .catch((error) => { throw error.response || error; });
}

export function callLoreInWorld(id) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.get(`/api/lore/inWorld/${id}`, config)
    .then(response => response.data)
    .catch((error) => { throw error.response || error; });
}

export function callSearchLore(payload) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.get('/api/lore/search/general', {params: {searchQuery: payload}}, config)
    .then(response => response.data)
    .catch((error) => { throw error.response || error; });
}

export function callPostLore(payload) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.post('/api/lore', payload, config)
    .then(response => response)
    .catch((error) => { throw error.response || error; });
}

export function callUpdateLore(action) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.get(`/api/lore/${action.id}`, action.payload, config)
    .then(response => response)
    .catch((error) => { throw error.response || error; });
}

export function callDeleteLore(id) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.get(`/api/lore/${id}`, config)
    .then(response => response)
    .catch((error) => { throw error.response || error; });
}

