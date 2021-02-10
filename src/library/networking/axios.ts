import axios from 'axios';

// CONSTANTS
import {API} from '@constants/Api';

// AXIOS CONFIGURATION
export const api = axios.create({
  baseURL: API.URL,
  timeout: 10000,
  headers: {
    Accept: 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json',
  },
});
