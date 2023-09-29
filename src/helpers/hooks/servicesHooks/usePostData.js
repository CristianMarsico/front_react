import axios from 'axios';
import { RequiereTokenHelpers } from '../../RequiereTokenHelpers';

export async function fetchPostDataWithToken(url, data) {
    let token = await RequiereTokenHelpers();
    return await axios.post(url, data, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        withCredentials: true
    });
}