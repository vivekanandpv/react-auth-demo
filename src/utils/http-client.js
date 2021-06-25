import axios from 'axios';

export const httpClient = axios.create({
  baseURL: 'https://auth-demo.athenaeum.in/api/',
  timeout: 8000,
});
