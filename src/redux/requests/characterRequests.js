import axios from 'axios';

export function callCharacters() {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.get('/api/character', config)
    .then(response => response.data)
    .catch((error) => {
      throw error.response || error;
    });
}

export function callCharacterDetails(id) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.get(`/api/character/details/${id}`, config)
    .then(response => response.data)
    .catch((error) => {
      throw error.response || error;
    });
}

export function callSearchCharacters(payload) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.get(`/api/character/search/general`, {params: {searchQuery: payload}}, config)
    .then(response => response.data)
    .catch((error) => {
      throw error.response || error;
    });
}

export function callCharactersInWorld(id) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.get(`/api/character/inWorld/${id}`, config)
    .then(response => response.data)
    .catch((error) => {
      throw error.response || error;
    });
}

export function callCharactersInStory(id) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.get(`/api/character/inStory/${id}`, config)
    .then(response => response.data)
    .catch((error) => {
      throw error.response || error;
    });
}

export function callCharactersVisitedLocation(id) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.get(`/api/character/location/${id}`, config)
    .then(response => response.data)
    .catch((error) => {
      throw error.response || error;
    }); 
}

export function callCharacterHomeIs(id) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.get(`/api/character/homeIs/${id}`, config)
    .then(response => response.data)
    .catch((error) => {
      throw error.response || error;
    }); 
}

export function callCharacterRelationships(id) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.get(`/api/character/relationships/${id}`, config)
    .then(response => response.data)
    .catch((error) => {
      throw error.response || error;
    });  
}

export function callAddCharacter(payload) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.post(`/api/character`, payload, config)
    .then(response => response.data[0].id)
    .catch((error) => {
      throw error.response || error;
    });  
}

export function callEditCharacter(action) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.put(`/api/character/${action.id}`, action.payload, config)
    .then(response => response)
    .catch((error) => {
      throw error.response || error;
    });  
}

export function callDeleteCharacter(id) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.delete(`/api/character/${id}`, config)
    .then(response => response)
    .catch((error) => {
      throw error.response || error;
    });  
}