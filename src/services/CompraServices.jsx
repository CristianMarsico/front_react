import { fetchGetAllDataWithToken } from "../helpers/hooks/servicesHooks/useGetALLData";
import { fetchPostDataWithToken } from "../helpers/hooks/servicesHooks/usePostData";

/**
 * Realiza una solicitud para realizar una compra.
 *
 * @param {Object} datosEnviados - Los datos de la compra a enviar.
 * @param {string} datosEnviados.producto - El nombre del producto a comprar.
 * @param {number} datosEnviados.cantidad - La cantidad del producto a comprar.
 * @param {number} datosEnviados.precio_unitario - El precio unitario del producto.
 * @param {string} datosEnviados.fecha - La fecha de la compra en formato YYYY-MM-DD.
 * @returns {Promise} - Una promesa que se resolverá con los datos de la respuesta de la solicitud.
 */
export function CompraServices(datosEnviados) {
    const URL_COMPRA = "http://localhost:3000/api/compra";
    let userData = {
        producto: datosEnviados.producto,
        cantidad: datosEnviados.cantidad,
        precio_unitario: datosEnviados.precio_unitario,
        fecha: datosEnviados.fecha,
    };
    return fetchPostDataWithToken(URL_COMPRA, userData)
}

/**
 * Realiza una solicitud para obtener todas las compras registradas en la aplicación.
 *
 * @returns {Promise} - Promesa que resuelve con los datos de las compras registradas.
 */
export function getAllCompras() {
    const URL_GETALL = "http://localhost:3000/api/getAllCompras";
    return fetchGetAllDataWithToken(URL_GETALL)
}