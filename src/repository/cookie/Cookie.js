import {Cookies} from 'react-cookie';
import {v4} from "uuid";

const cookies = new Cookies();

export const getToken = () => {
    const token = cookies.get('token')
    if (!token) {
        cookies.set('token', v4());
    }
    return cookies.get('token');
}