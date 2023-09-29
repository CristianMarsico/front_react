import axios from 'axios';
import { RequiereTokenHelpers } from '../../RequiereTokenHelpers';


export async function fetchUpdateDataWithToken(url, data) {
    let token = await RequiereTokenHelpers();

    return await axios.put(url, data, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        withCredentials: true
    });
}