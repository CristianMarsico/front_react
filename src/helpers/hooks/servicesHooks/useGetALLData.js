import axios from 'axios';
import { RequiereTokenHelpers } from '../../RequiereTokenHelpers';

/**
 * Realiza una solicitud GET a la URL especificada con un token de autorización.
 *
 * @param {string} url - La URL a la que se enviará la solicitud GET.
 * @returns {Promise} - Promesa que resuelve con los datos de la respuesta cuando la solicitud se completa con éxito.
 */
export async function fetchGetAllDataWithToken(url) {
    // Obtiene el token de autorización utilizando RequiereTokenHelpers.
    let token = await RequiereTokenHelpers();

    // Realiza la solicitud GET a la URL con el token en los encabezados.
    return await axios.get(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        withCredentials: true
    });
}