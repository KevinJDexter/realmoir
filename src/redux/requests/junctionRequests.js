import axios from 'axios';

export function callLocationStoryJunction (payload) {
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

export function callDeleteLSJunctionByLocation (id) {
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

export function callDeleteLSJunctionByStory (id) {
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

