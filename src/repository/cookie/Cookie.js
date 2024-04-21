import {Cookies} from 'react-cookie';
import {v4} from "uuid";

const cookies = new Cookies();

export const TokenType = {
    ACCESS_TOKEN: 'ACCESS_TOKEN',
    REFRESH_TOKEN: 'REFRESH_TOKEN',
}

export const getToken = (type) => {
    return cookies.get(type);
}

export const setToken = (value, type) => {
    cookies.set(type, value);
}