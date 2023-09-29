import axios from 'axios';
import { fetchGetAllDataWithToken } from '../helpers/hooks/servicesHooks/useGetALLData';
import { fetchPostDataWithToken } from '../helpers/hooks/servicesHooks/usePostData';
import { fetchUpdateDataWithToken } from '../helpers/hooks/servicesHooks/useUpdateData';

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

export async function getProductoByName() {
    const GET_PRODUCTO_BY_NAME = "http://localhost:3000/api/hiladoNombre";
    return fetchGetAllDataWithToken(GET_PRODUCTO_BY_NAME)
}

export async function getAllHilado() {
    const URL_GETALL = "http://localhost:3000/api/hilado";
    return fetchGetAllDataWithToken(URL_GETALL)
}

export async function moverStock(datos) {

    let STOCK = {
        cantidad_tranferida: datos.cantidad,
        origen: datos.origen,
        destino: datos.destino
    }
    const URL_MOVER_STOCK = `http://localhost:3000/api/trasferirStock/${datos.id}`;
    return fetchUpdateDataWithToken(URL_MOVER_STOCK, STOCK)
}

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

export async function actualizarPrecio(datos) {

    let PRECIO = {
        tipo_consumidor: datos.tipoConsumidor,
        total: datos.total,
    }
    const URL_MODIFICAR_PRECIO = `http://localhost:3000/api/cambiarPrecio/${datos.id}`;
    return fetchUpdateDataWithToken(URL_MODIFICAR_PRECIO, PRECIO)
}

export async function incrementar_stock(datos) {

    let STOCK = {
        stock: datos.ciudad,
        total: datos.total,
    }
    const URL_INCREMENTAR_STOCK = `http://localhost:3000/api/incrementarMercaderia/${datos.id}`;
    return fetchUpdateDataWithToken(URL_INCREMENTAR_STOCK, STOCK)
}

export async function getReporteVenta(datos) {
    const URL_REPORTE = `http://localhost:3000/api/reporteVenta/${datos.fechaMin}/${datos.fechaMax}`;
    return await axios.get(URL_REPORTE, { responseType: 'arraybuffer', withCredentials: true });
}