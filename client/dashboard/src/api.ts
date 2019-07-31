import axios from 'axios';

const instance = axios.create({
  baseURL: 'localhost:1234',
  timeout: 1000,
  headers: {}
});

