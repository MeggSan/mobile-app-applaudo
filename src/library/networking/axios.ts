import axios from 'axios';
import {API} from '@constants/Api';

// AXIOS CONFIGURATION
export const api = axios.create({
  baseURL: API.URL,
  timeout: 1000,
  headers: {
    Accept: 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json',
  },
});
