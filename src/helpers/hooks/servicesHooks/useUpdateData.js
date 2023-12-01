import axios from 'axios';
import { RequiereTokenHelpers } from '../../RequiereTokenHelpers';

/**
 * Realiza una solicitud PUT a la URL especificada con un token de autorización.
 *
 * @param {string} url - La URL a la que se enviará la solicitud PUT.
 * @param {Object} data - Los datos que se enviarán en el cuerpo de la solicitud.
 * @returns {Promise} - Promesa que resuelve con los datos de la respuesta cuando la solicitud se completa con éxito.
 */
export async function fetchUpdateDataWithToken(url, data) {
    // Obtiene el token de autorización utilizando RequiereTokenHelpers.
    let token = await RequiereTokenHelpers();

    // Realiza la solicitud PUT a la URL con los datos y el token en los encabezados.
    return await axios.put(url, data, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        withCredentials: true
    });
}