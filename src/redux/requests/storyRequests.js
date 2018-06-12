import axios from 'axios';

export function callStories() {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.get('/api/story', config)
    .then(response => response.data)
    .catch((error) => { throw error.response || error; });
}

export function callStoriesInWorld(id) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.get(`/api/story/inWorld/${id}`, config)
    .then(response => response.data)
    .catch((error) => { throw error.response || error; });
}

export function callGenreList() {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.get('/api/genre', config)
    .then(response => response.data)
    .catch((error) => { throw error.response || error; })
}

export function postNewStory(payload) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.post('/api/story', payload, config)
    .then(response => response.data[0].id)
    .catch((error) => { throw error.response || error })
}

export function callStoriesWithLocation(id) {
  const config = {
    headers: { 'Content-Type': 'application/json'},
    withCredentials: true,
  };

  return axios.get(`/api/story/withLocation/${id}`, config)
    .then(response => response.data)
    .catch((error) => { throw error.response || error; });
}

export function callStoriesWithCharacter(id) {
  const config = {
    headers: { 'Content-Type': 'application/json'},
    withCredentials: true,
  };

  return axios.get(`/api/story/withCharacter/${id}`, config)
    .then(response => response.data)
    .catch((error) => { throw error.response || error; });
}

export function callStoriesWithEvent(id) {
  const config = {
    headers: { 'Content-Type': 'application/json'},
    withCredentials: true,
  };

  return axios.get(`/api/story/withEvent/${id}`, config)
    .then(response => response.data)
    .catch((error) => { throw error.response || error; });
}

export function callSearchStories(searchQuery) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.get('/api/story/search/general', {params: {searchQuery: searchQuery}}, config)
    .then(response => response.data)
    .catch((error) => { throw error.response || error; });
}

export function callStoryDetails(payload) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.get(`/api/story/${payload}`, config)
    .then(response => response.data[0])
    .catch((error) => { throw error.response || error })
}

export function editStoryDetails(action) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };
     
  return axios.put(`/api/story/${action.id}`, action.payload, config)
    .then(response => response)
    .catch((error) => { throw error.response || error });
}

export function deleteStory(id) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.delete(`/api/story/${id}`, config)
    .then(response => response)
    .catch((error) => { throw error.response || error });
}