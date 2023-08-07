import axios from 'axios';

export async function getMPByName() {
    const URL_MP_GETALL = "http://localhost:3000/api/getMPByName";

    return await axios.get(URL_MP_GETALL, { withCredentials: true });
}

export async function getAllMP() {
    const URL_MP_GETALL = "http://localhost:3000/api/getAllMP";

    return await axios.get(URL_MP_GETALL, { withCredentials: true });
}