import axios from 'axios';

const chatPingAxios = axios.create({
    baseURL: 'http://localhost:3001/api/v1',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default chatPingAxios;