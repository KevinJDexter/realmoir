import axios from 'axios';

export function callLocationStoryJunction(payload) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.post('/api/junction/locationStory', payload, config)
    .then(response => response)
    .catch((error) => {
      throw error.response || error;
    })
}

export function callDeleteLSJunctionByLocation(id) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.delete(`/api/junction/locationStory/location/${id}`, config)
    .then(response => response)
    .catch((error) => {
      throw error.response || error;
    })
}

export function callDeleteLSJunctionByStory(id) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.delete(`/api/junction/locationStory/story/${id}`, config)
    .then(response => response)
    .catch((error) => {
      throw error.response || error;
    })
}

export function callPostNeighboringLocations(payload) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.post('/api/junction/neighboringLocations', payload, config)
    .then(response => response)
    .catch((error) => {
      throw error.response || error;
    })
}

export function callDeleteNeighboringLocations(id) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.delete(`/api/junction/neighboringLocations/${id}`, config)
    .then(response => response)
    .catch((error) => {
      throw error.response || error;
    })
}

export function callPostCLJunction(payload) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.post('/api/junction/characterLocation', payload, config)
    .then(response => response)
    .catch((error) => {
      throw error.response || error;
    })
};

export function callDeleteCLJunctionByCharacter(id) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.delete(`/api/junction/characterLocation/character/${id}`, config)
    .then(response => response)
    .catch((error) => {
      throw error.response || error;
    })
};

export function callDeleteCLJunctionByLocation(id) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.delete(`/api/junction/characterLocation/location/${id}`, config)
    .then(response => response)
    .catch((error) => {
      throw error.response || error;
    })
};

export function callPostCharacterRelationships(payload) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.post('/api/junction/characterRelationships', payload, config)
    .then(response => response)
    .catch((error) => {
      throw error.response || error;
    })
};

export function callDeleteCharacterRelationships(id) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.delete(`/api/junction/characterRelationships/${id}`, config)
    .then(response => response)
    .catch((error) => {
      throw error.response || error;
    })
};

export function callPostCSJunction(payload) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.post('/api/junction/characterStory', payload, config)
    .then(response => response)
    .catch((error) => {
      throw error.response || error;
    })
}

export function callDeleteCSJunctionByCharacter(id) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.delete(`/api/junction/characterStory/character/${id}`, config)
    .then(response => response)
    .catch((error) => {
      throw error.response || error;
    })
}

export function callDeleteCSJunctionByStory(id) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.delete(`/api/junction/characterStory/story/${id}`, config)
    .then(response => response)
    .catch((error) => {
      throw error.response || error;
    })
}

