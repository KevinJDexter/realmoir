import axios from 'axios';

export function callLocations() {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.get('api/location/', config)
    .then(response => response.data)
    .catch((error) => {
      throw error.response || error;
    });
}

