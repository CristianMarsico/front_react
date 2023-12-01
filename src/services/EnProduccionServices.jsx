"use strict";
import { fetchGetAllDataWithToken } from "../helpers/hooks/servicesHooks/useGetALLData";

/**
 * Realiza una solicitud para obtener todos los datos relacionados con productos en producción.
 *
 * @returns {Promise} Una promesa que resuelve con los datos de productos en producción o se rechaza si hay un error.
 */
export async function getAllEnProduccion() {
    const URL_GETALL = 'http://localhost:3000/api/getAllEnProduc';
    return fetchGetAllDataWithToken(URL_GETALL);
}