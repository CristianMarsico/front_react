import axios from 'axios';

export async function getAll() {
    const URL_MP_GETALL = "http://localhost:3000/api/getAllMP";

    return await axios.get(URL_MP_GETALL, { withCredentials: true });
}

// export async function getOne() {
//     const URL_MP_GETALL = "http://localhost:3000/api/getAllMP";

//     return await axios.get(URL_MP_GETALL, userData, { withCredentials: true });
// }