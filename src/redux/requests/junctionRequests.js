import axios from 'axios';


// LOCATIONS_STORIES_JUNCTION

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


// NEIGHBORING_LOCATIONS_JUNCTION

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


// CHARACTERS_LOCATIONS_JUNCTION

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


// CHARACTER_RELATIONSHIPS_JUNCTION

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


// CHARACTERS_STORIES_JUNCTION

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


// CHARACTERS_EVENTS_JUNCTION
export function callPostCEJunction(payload) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.post('/api/junction/characterEvent', payload, config)
    .then(response => response)
    .catch((error) => {
      throw error.response || error;
    })
}

export function callDeleteCEJunctionByCharacter(id) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.delete(`/api/junction/characterEvent/character/${id}`, config)
    .then(response => response)
    .catch((error) => {
      throw error.response || error;
    })
}

export function callDeleteCEJunctionByEvent(id) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.delete(`/api/junction/characterEvent/event/${id}`, config)
    .then(response => response)
    .catch((error) => {
      throw error.response || error;
    })
}

// EVENTS_STORIES_JUNCTION
export function callPostESJunction(payload) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.post('/api/junction/eventStory', payload, config)
    .then(response => response)
    .catch((error) => {
      throw error.response || error;
    })
}

export function callDeleteESJunctionByEvent(id) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.delete(`/api/junction/eventStory/event/${id}`, config)
    .then(response => response)
    .catch((error) => {
      throw error.response || error;
    })
}

export function callDeleteESJunctionByStory(id) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.delete(`/api/junction/eventStory/story/${id}`, config)
    .then(response => response)
    .catch((error) => {
      throw error.response || error;
    })
}


