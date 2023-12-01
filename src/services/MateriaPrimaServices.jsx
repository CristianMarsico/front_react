import axios from 'axios';
import { fetchGetAllDataWithToken } from '../helpers/hooks/servicesHooks/useGetALLData';
import { fetchUpdateDataWithToken } from '../helpers/hooks/servicesHooks/useUpdateData';
import { fetchDeleteDataWithToken } from '../helpers/hooks/servicesHooks/useDeleteData';

/**
 * Realiza una solicitud para obtener todas las materias primas por nombre.
 *
 * @returns {Promise} Una promesa que resuelve en un array con los resultados o se rechaza si hay un error.
 */
export async function getMPByName() {
    const URL_MP_GETALL = "http://localhost:3000/api/getMPByName";
    return fetchGetAllDataWithToken(URL_MP_GETALL)
}


/**
 * Realiza una solicitud para obtener todas las materias primas.
 *
 * @returns {Promise} Una promesa que resuelve en un array con los resultados o se rechaza si hay un error.
 */
export async function getAllMP() {
    const URL_MP_GETALL = "http://localhost:3000/api/getAllMP";
    return fetchGetAllDataWithToken(URL_MP_GETALL)
}

/**
 * Realiza una solicitud para eliminar una materia prima por su ID.
 *
 * @param {number} id - ID de la materia prima que se va a eliminar.
 * @returns {Promise} Una promesa que resuelve cuando se elimina la materia prima con éxito o se rechaza si hay un error.
 */
export async function eliminarMateriaPrima(id) {
    const URL_DELETE = `http://localhost:3000/api/deleteMP/${id}`;
    return fetchDeleteDataWithToken(URL_DELETE)
}

/**
 * Realiza una solicitud para actualizar el stock de una materia prima.
 *
 * @param {Object} datos - Objeto con los detalles de la actualización de stock.
 * @returns {Promise} Una promesa que resuelve cuando se actualiza el stock con éxito o se rechaza si hay un error.
 */
export async function actualizarStock(datos) {
    let CANTIDAD = {
        nombre: datos.nombre,
        cantidad: datos.cantidad,
        fecha: datos.fecha
    }
    const URL_ACTUALIZAR_STOCK = `http://localhost:3000/api/updateStock/${datos.id}`;
    return fetchUpdateDataWithToken(URL_ACTUALIZAR_STOCK, CANTIDAD)
}


/**
 * Realiza una solicitud para actualizar los datos de una materia prima.
 *
 * @param {Object} datos - Objeto con los nuevos datos de la materia prima.
 * @returns {Promise} Una promesa que resuelve cuando se actualizan los datos de la materia prima con éxito o se rechaza si hay un error.
 */
export async function actualizarMP(datos) {

    let DATA = {
        nombre: datos.nombre,
        precio: datos.precio,
        stock: datos.stock,
    }
    const URL_ACTUALIZAR_MP = `http://localhost:3000/api/updateMP/${datos.id}`;
    return fetchUpdateDataWithToken(URL_ACTUALIZAR_MP, DATA)

}

/**
 * Realiza una solicitud para obtener un informe de compras dentro de un rango de fechas.
 *
 * @param {Object} datos - Objeto con las fechas mínima y máxima del rango para el informe.
 * @returns {Promise} Una promesa que resuelve en un archivo PDF (array de bytes) o se rechaza si hay un error.
 */
export async function getReporte(datos) {
    const URL_REPORTE = `http://localhost:3000/api/reporteCompra/${datos.fechaMin}/${datos.fechaMax}`;
    return await axios.get(URL_REPORTE, { responseType: 'arraybuffer', withCredentials: true });
}

/**
 * Realiza una solicitud para obtener un informe de producción de materias primas dentro de un rango de fechas.
 *
 * @param {Object} datos - Objeto con las fechas mínima y máxima del rango para el informe de producción.
 * @returns {Promise} Una promesa que resuelve en un archivo PDF (array de bytes) o se rechaza si hay un error.
 */
export async function getReporteProduccion(datos) {
    const URL_REPORTE = `http://localhost:3000/api/reporteProduccion/${datos.fechaMin}/${datos.fechaMax}`;
    return await axios.get(URL_REPORTE, { responseType: 'arraybuffer', withCredentials: true });
}