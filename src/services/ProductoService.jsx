import axios from 'axios';
import { fetchGetAllDataWithToken } from '../helpers/hooks/servicesHooks/useGetALLData';
import { fetchPostDataWithToken } from '../helpers/hooks/servicesHooks/usePostData';
import { fetchUpdateDataWithToken } from '../helpers/hooks/servicesHooks/useUpdateData';

/**
 * Realiza una solicitud para agregar un nuevo hilado a la aplicación.
 *
 * @param {Object} datos - Objeto que contiene los detalles del hilado a agregar.
 * @returns {Promise} Una promesa que resuelve cuando se agrega el hilado con éxito o se rechaza si hay un error.
 */
export function addHilado(datos) {

    let HILADO = {
        producto_terminado: datos.nombre,
        color: datos.color,
        stock_loberia: datos.stock_loberia,
        stock_buenosAires: datos.stock_BuenosAires,
        precio_venta_mayorista: datos.precio_mayorista,
        precio_venta_minorista: datos.precio_minorista
    }
    const ADD_HILADO = "http://localhost:3000/api/hilado";
    return fetchPostDataWithToken(ADD_HILADO, HILADO)
}

/**
 * Realiza una solicitud para obtener un producto hilado por su nombre.
 *
 * @returns {Promise} Una promesa que resuelve en un array con los resultados o se rechaza si hay un error.
 */
export async function getProductoByName() {
    const GET_PRODUCTO_BY_NAME = "http://localhost:3000/api/hiladoNombre";
    return fetchGetAllDataWithToken(GET_PRODUCTO_BY_NAME)
}

/**
 * Realiza una solicitud para obtener todos los productos hilados.
 *
 * @returns {Promise} Una promesa que resuelve en un array con los resultados o se rechaza si hay un error.
 */
export async function getAllHilado() {
    const URL_GETALL = "http://localhost:3000/api/hilado";
    return fetchGetAllDataWithToken(URL_GETALL)
}

/**
 * Realiza una solicitud para transferir stock de un origen a un destino.
 *
 * @param {Object} datos - Objeto con los detalles de la transferencia de stock.
 * @returns {Promise} Una promesa que resuelve cuando se realiza la transferencia de stock con éxito o se rechaza si hay un error.
 */
export async function moverStock(datos) {

    let STOCK = {
        cantidad_tranferida: datos.cantidad,
        origen: datos.origen,
        destino: datos.destino
    }
    const URL_MOVER_STOCK = `http://localhost:3000/api/trasferirStock/${datos.id}`;
    return fetchUpdateDataWithToken(URL_MOVER_STOCK, STOCK)
}

/**
 * Realiza una solicitud para registrar una venta de producto hilado.
 *
 * @param {Object} datos - Objeto que contiene los detalles de la venta.
 * @returns {Promise} Una promesa que resuelve cuando la venta se registra con éxito o se rechaza si hay un error.
 */
export async function vender(datos) {
    let VENTA = {
        producto_id: datos.id,
        nombre_prod: datos.nombre_prod,
        color: datos.color,
        cantidad_vendida: datos.cantidad,
        origen: datos.ciudad,
        tipo_venta: datos.tipo_venta,
        fecha: datos.fecha,
        cliente: datos.cliente,
        medio_pago: datos.medio_pago,
        email: datos.email,
        telefono: datos.telefono,
        direccion: datos.direccion
    }
    const URL_VENTA = "http://localhost:3000/api/venta";
    return fetchPostDataWithToken(URL_VENTA, VENTA)
}

/**
 * Realiza una solicitud para actualizar el precio de un producto hilado.
 *
 * @param {Object} datos - Objeto con los detalles de la actualización de precio.
 * @returns {Promise} Una promesa que resuelve cuando se actualiza el precio con éxito o se rechaza si hay un error.
 */
export async function actualizarPrecio(datos) {

    let PRECIO = {
        tipo_consumidor: datos.tipoConsumidor,
        total: datos.total,
    }
    const URL_MODIFICAR_PRECIO = `http://localhost:3000/api/cambiarPrecio/${datos.id}`;
    return fetchUpdateDataWithToken(URL_MODIFICAR_PRECIO, PRECIO)
}

/**
 * Realiza una solicitud para incrementar el stock de un producto hilado en una ciudad.
 *
 * @param {Object} datos - Objeto con los detalles del incremento de stock.
 * @returns {Promise} Una promesa que resuelve cuando se incrementa el stock con éxito o se rechaza si hay un error.
 */
export async function incrementar_stock(datos) {

    let STOCK = {
        stock: datos.ciudad,
        total: datos.total,
    }
    const URL_INCREMENTAR_STOCK = `http://localhost:3000/api/incrementarMercaderia/${datos.id}`;
    return fetchUpdateDataWithToken(URL_INCREMENTAR_STOCK, STOCK)
}

/**
 * Realiza una solicitud para obtener un informe de ventas dentro de un rango de fechas.
 *
 * @param {Object} datos - Objeto con las fechas mínima y máxima del rango para el informe de ventas.
 * @returns {Promise} Una promesa que resuelve en un archivo PDF (array de bytes) o se rechaza si hay un error.
 */
export async function getReporteVenta(datos) {
    const URL_REPORTE = `http://localhost:3000/api/reporteVenta/${datos.fechaMin}/${datos.fechaMax}`;
    return await axios.get(URL_REPORTE, { responseType: 'arraybuffer', withCredentials: true });
}