import axios from 'axios';
import { RequiereTokenHelpers } from '../../RequiereTokenHelpers';

export async function fetchGetAllDataWithToken(url) {

    let token = await RequiereTokenHelpers();
    return await axios.get(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        withCredentials: true
    });
}