import { fetchGetAllDataWithToken } from '../helpers/hooks/servicesHooks/useGetALLData';

/**
 * Realiza una solicitud para obtener todas las ventas registradas en la aplicación.
 *
 * @returns {Promise} Una promesa que resuelve con la lista de ventas o se rechaza si hay un error.
 */
export async function getAllVentas() {
    const URL_GETALL = "http://localhost:3000/api/getAllVentas";
    return fetchGetAllDataWithToken(URL_GETALL)
}