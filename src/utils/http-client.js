import axios from 'axios';

export const httpClient = axios.create({
  baseURL: 'http://localhost:5000/api/v1/',
  timeout: 8000,
});
