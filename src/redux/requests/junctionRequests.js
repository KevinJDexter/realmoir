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