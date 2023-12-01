
/**
 * Módulo que maneja las solicitudes de obtención y actualización de datos de clientes en la aplicación.
 * Utiliza funciones de ayuda para realizar las solicitudes HTTP.
 */

'use strict';

// Importa funciones de ayuda para realizar solicitudes HTTP con token de autenticación.
import { fetchGetAllDataWithToken } from "../helpers/hooks/servicesHooks/useGetALLData";
import { fetchUpdateDataWithToken } from "../helpers/hooks/servicesHooks/useUpdateData";

/**
 * Obtiene todos los clientes disponibles en la aplicación.
 *
 * @returns {Promise} Promesa que resuelve con los datos de los clientes.
 */
export async function getAllClientes() {
    const URL_GETALL = 'http://localhost:3000/api/getAllClientes';
    return fetchGetAllDataWithToken(URL_GETALL);
}


/**
 * Actualiza los datos de un cliente específico en la aplicación.
 *
 * @param {Object} datos - Objeto que contiene los datos actualizados del cliente.
 * @returns {Promise} Promesa que resuelve cuando la actualización se completa.
 */
export async function actualizarCliente(datos) {
    let DATA = {
        direccion: datos.direccion,
        email: datos.email,
        telefono: datos.telefono,
    }
    const URL_ACTUALIZAR_CLIENTE = `http://localhost:3000/api/updateCliente/${datos.id}`;
    return fetchUpdateDataWithToken(URL_ACTUALIZAR_CLIENTE, DATA)
}