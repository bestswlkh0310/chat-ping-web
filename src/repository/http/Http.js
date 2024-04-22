import axios from 'axios';
import {clearToken, getCookie, setCookie, TokenType as TOKENType, TokenType} from "../cookie/Cookie";
import {jwtDecode} from 'jwt-decode';

const chatPingAxios = axios.create({
    baseURL: 'http://localhost:3001/api/v1',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    }
});


chatPingAxios.interceptors.request.use(
    (config) => {
        console.log('interceptor - url: ', config.url);
        console.log('interceptor - date: ', config.data);

        if (
            config.url === '/api/v1/refresh' ||
            config.url === '/api/v1/login'
        ) {
            console.log(`interceptor - passed-url: ${config.url}`);
            return config;
        }

        const accessToken = getCookie(TokenType.ACCESS_TOKEN);
        const refreshToken = getCookie(TokenType.REFRESH_TOKEN);

        if (!accessToken) {
            return config;
        }
        if (accessToken) {
            const decoded = jwtDecode(accessToken);
            const expirationTime = decoded.exp;
            const currentTime = Math.floor(Date.now() / 1000);
            console.log('httpClient -', expirationTime, currentTime);
            if (expirationTime < currentTime) {
                // refresh
                chatPingAxios.post('/auth/refresh', {}, {
                    headers: {
                        'Authorization': `Bearer ${refreshToken}`,
                    }
                }).then(res => {
                    const {accessToken} = res.data;
                    setCookie(accessToken, TokenType.ACCESS_TOKEN);
                }).catch(_ => {
                    clearToken();
                });
            }
        }
        config.headers.Authorization = `Bearer ${getCookie(TOKENType.ACCESS_TOKEN)}`;
        return config;
    },
    (error) => Promise.reject(error)
);

export default chatPingAxios;