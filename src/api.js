import axios from 'axios';
import { getNavigate } from './navigation';

// Create an Axios instance with the base URL of your backend
const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAllModels = async () => {
  try {
    const response = await api.get('/models'); // Use '/models' as the endpoint
    return response.data;
  } catch (error) {
    console.error('Error fetching models:', error);
    throw error;
  }
};


export const createModel = (modelData) => {
  return api.post('/models', modelData)
    .then(response => response.data)
    .catch(error => {
      console.error('Error creating model:', error);
      throw error;
    });
};


export const getModelById = (modelId) => {
  return api.get(`/models/${modelId}`) 
    .then(response => response.data)
    .catch(error => {
      console.error(`Error fetching model with ID ${modelId}:`, error);
      throw error;
    });
};


export const uploadTrainingData = (modelId, data) => {
  return api.post(`/models/${modelId}/data`, { data }) 
    .then(response => response.data)
    .catch(error => {
      console.error(`Error uploading training data for model with ID ${modelId}:`, error);
      throw error;
    });
};


export const startTraining = (modelId) => {
  return api.post(`/models/${modelId}/train`) 
    .then(response => response.data)
    .catch(error => {
      console.error(`Error starting training for model with ID ${modelId}:`, error);
      throw error;
    });
};


export const uploadFile = (modelId, file) => {
  const formData = new FormData();
  formData.append('file', file);

  return api.post(`/models/${modelId}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then(response => response.data)
    .catch(error => {
      console.error(`Error uploading file for model with ID ${modelId}:`, error);
      throw error;
    });
};




api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      const { status } = error.response;
      const navigate = getNavigate();
      if (status === 403) {
        if (navigate) navigate('/forbidden');
      } else if (status === 401) {
        // Redirect to models page on 401
        if (navigate) navigate('/models');
      }
    }
    return Promise.reject(error);
  }
);



// Export the instance for making general requests
export default api;
