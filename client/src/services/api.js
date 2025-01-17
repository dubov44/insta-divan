import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Add request interceptor for debugging
axios.interceptors.request.use(request => {
  console.log('Starting Request:', request);
  return request;
});

// Add response interceptor for debugging
axios.interceptors.response.use(
  response => {
    console.log('Response:', response);
    return response;
  },
  error => {
    console.error('API Error:', error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error Data:', error.response.data);
      console.error('Error Status:', error.response.status);
      console.error('Error Headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error setting up request:', error.message);
    }
    return Promise.reject(error);
  }
);

const api = {
  getEntities: async () => {
    try {
      const response = await axios.get(`${API_URL}/entities`);
      return response.data;
    } catch (error) {
      console.error('Get Entities Error:', error);
      throw error;
    }
  },

  createEntity: async (entity) => {
    try {
      console.log('Creating entity:', entity);
      const response = await axios.post(`${API_URL}/entities`, entity);
      console.log('Create response:', response);
      return response.data;
    } catch (error) {
      console.error('Create Entity Error:', error);
      throw error;
    }
  },

  updateEntityTopics: async (entityId, topics) => {
    try {
      const response = await axios.patch(`${API_URL}/entities/${entityId}`, { topics });
      return response.data;
    } catch (error) {
      console.error('Update Topics Error:', error);
      throw error;
    }
  },

  deleteEntity: async (entityId) => {
    try {
      await axios.delete(`${API_URL}/entities/${entityId}`);
    } catch (error) {
      console.error('Delete Entity Error:', error);
      throw error;
    }
  }
};

export default api; 