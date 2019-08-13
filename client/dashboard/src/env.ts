import dotenv from 'dotenv';

dotenv.config();

interface Env {
    NODE_ENV: 'production' | 'development';
    API_URL: string;
    CLIENT_URL: string;
}

const env: Env = {
    NODE_ENV: (process.env.NODE_ENV || 'development') as Env['NODE_ENV'],
    API_URL: process.env.REACT_APP_API_URL || 'http://localhost:8888',
    CLIENT_URL: process.env.REACT_APP_CLIENT_URL || 'http://localhost:8080'
};

export default env;