import axios from 'axios';

export function callLocations() {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.get('/api/location', config)
    .then(response => response.data)
    .catch((error) => {
      throw error.response || error;
    });
}

export function callSearchLocations(searchQuery) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.get('/api/location/search/general', {params: {searchQuery: searchQuery}}, config)
    .then(response => response.data)
    .catch((error) => {
      throw error.response || error;
    })
} 

export function callLocationsInWorld(id) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.get(`/api/location/inWorld/${id}`, config)
    .then(response => response.data)
    .catch((error) => {
      throw error.response || error;
    });
}