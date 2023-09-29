import axios from 'axios';
import { RequiereTokenHelpers } from '../../RequiereTokenHelpers';

export async function fetchDeleteDataWithToken(url) {

    let token = await RequiereTokenHelpers();
    return await axios.delete(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        withCredentials: true
    });
}