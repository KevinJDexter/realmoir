import axios from 'axios';

export function callStories() {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.get('api/story', config)
    .then(response => response.data)
    .catch((error) => { throw error.response || error; });
}

export function callStoriesInWorld(id) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.get(`api/story/inWorld/${id}`, config)
    .then(response => response.data)
    .catch((error) => { throw error.response || error; });
}

export function callGenreList() {
  const config = {
    headers: {'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.get('/api/genre', config)
    .then(response => response.data)
    .catch((error) => { throw error.response || error; })
}