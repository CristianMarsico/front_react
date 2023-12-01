import axios from 'axios';
import { RequiereTokenHelpers } from '../../RequiereTokenHelpers';

/**
 * Realiza una solicitud de eliminación de datos a la URL especificada con un token de autorización.
 *
 * @param {string} url - La URL a la que se enviará la solicitud de eliminación.
 * @returns {Promise} - Promesa que resuelve cuando la solicitud de eliminación se completa con éxito.
 */
export async function fetchDeleteDataWithToken(url) {
    // Obtiene el token de autorización utilizando RequiereTokenHelpers.
    let token = await RequiereTokenHelpers();

    // Realiza la solicitud de eliminación a la URL con el token en los encabezados.
    return await axios.delete(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        withCredentials: true
    });
}