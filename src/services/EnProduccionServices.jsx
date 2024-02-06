"use strict";
import { fetchGetAllDataWithToken } from "../helpers/hooks/servicesHooks/useGetALLData";
import { fetchDeleteDataWithToken } from '../helpers/hooks/servicesHooks/useDeleteData';
/**
 * Realiza una solicitud para obtener todos los datos relacionados con productos en producción.
 *
 * @returns {Promise} Una promesa que resuelve con los datos de productos en producción o se rechaza si hay un error.
 */
export async function getAllEnProduccion() {
    const URL_GETALL = 'http://localhost:3000/api/getAllEnProduc';
    return fetchGetAllDataWithToken(URL_GETALL);
}

/**
 * Realiza una solicitud para eliminar una materia prima por su ID.
 *
 * @param {number} id - ID de la materia prima que se va a eliminar.
 * @returns {Promise} Una promesa que resuelve cuando se elimina la materia prima con éxito o se rechaza si hay un error.
 */
export async function eliminarEnProduccion(id) {
    const URL_DELETE = `http://localhost:3000/api/deleteEnProduccion/${id}`;
    return fetchDeleteDataWithToken(URL_DELETE)
}