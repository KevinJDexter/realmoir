import axios from 'axios';

export function callEvents() {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.get('/api/event', config)
    .then(response => response.data)
    .catch((error) => {
      throw error.response || error;
    });
}

export function callEventDetails(id) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.get(`/api/event/${id}`, config)
    .then(response => response.data[0])
    .catch((error) => {
      throw error.response || error;
    });
}

export function callSearchEvents(payload) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.get('/api/event/search/general', {params: {searchQuery: payload}}, config)
    .then(response => response.data)
    .catch((error) => {
      throw error.response || error;
    });
}

export function callEventsInWorld(id) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.get(`/api/event/inWorld/${id}`, config)
    .then(response => response.data)
    .catch((error) => {
      throw error.response || error;
    });
}

export function callEventsInStory(id) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.get(`/api/event/inStory/${id}`, config)
    .then(response => response.data)
    .catch((error) => {
      throw error.response || error;
    });
}

export function callEventsAtLocation(id) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.get(`/api/event/location/${id}`, config)
    .then(response => response.data)
    .catch((error) => {
      throw error.response || error;
    });
}

export function callEventsWithCharacter(id) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.get(`/api/event/character/${id}`, config)
    .then(response => response.data)
    .catch((error) => {
      throw error.response || error;
    });
}

export function callPostNewEvent(payload) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.post('/api/event', payload, config)
    .then(response => response.data)
    .catch((error) => {
      throw error.response || error;
    });
}

export function callUpdateEvent(action) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.put(`/api/event/${action.id}`, action.payload, config)
    .then(response => response.data)
    .catch((error) => {
      throw error.response || error;
    });
}

export function callDeleteEvent(id) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.delete(`/api/event${id}`, config)
    .then(response => response.data)
    .catch((error) => {
      throw error.response || error;
    });
}


