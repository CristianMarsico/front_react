import axios from 'axios';
import { RequiereTokenHelpers } from '../../RequiereTokenHelpers';

/**
 * Función para realizar una solicitud HTTP POST con un token de autenticación.
 *
 * @param {string} url - La URL a la que se enviará la solicitud POST.
 * @param {Object} data - Los datos que se enviarán en la solicitud POST.
 * @returns {Promise} - Una promesa que resuelve la respuesta de la solicitud.
 */
export async function fetchPostDataWithToken(url, data) {
    let token = await RequiereTokenHelpers();
    return await axios.post(url, data, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        withCredentials: true
    });
}