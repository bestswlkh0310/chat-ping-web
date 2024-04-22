import {Cookies} from 'react-cookie';
import {v4} from "uuid";

const cookies = new Cookies();

export const TokenType = {
    ACCESS_TOKEN: 'ACCESS_TOKEN',
    REFRESH_TOKEN: 'REFRESH_TOKEN',
}

export const FlowType = {
    IDLE: 'IDLE',
    MATCHED: 'MATCHED'
}

export const getCookie = (type) => {
    return cookies.get(type);
}

export const setCookie = (value, type) => {
    cookies.set(type, value);
}

export const clearToken = () => {
    cookies.set(TokenType.ACCESS_TOKEN, null);
    cookies.set(TokenType.REFRESH_TOKEN, null);
}