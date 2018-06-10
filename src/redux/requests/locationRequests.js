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

export function callLocationDetails(id) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.get(`/api/location/${id}`, config)
    .then(response => response.data[0])
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

export function callLocationsInStory(id) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.get(`/api/location/inStory/${id}`, config)
    .then(response => response.data)
    .catch((error) => {
      throw error.response || error;
    });
}

export function callPostLocation(payload) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.post('/api/location', payload, config)
    .then(response => response.data[0].id)
    .catch((error) => {
      throw error.response || error;
    })
}

export function callDeleteLocation(id) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.delete(`/api/location/${id}`, config)
    .then(response => response)
    .catch((error) => {
      throw error.response || error;
    }) 
}

export function callEditLocationDetails(action) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.put(`/api/location/${action.id}`, action.payload, config)
    .then(response => response)
    .catch((error) => {
      throw error.response || error;
    }) 
}

export function callNeighboringLocations(id) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.get(`/api/location/neighbors/${id}`, config)
    .then(response => response.data)
    .catch((error) => {
      throw error.response || error;
    })  
}