import axios from 'axios';
import { RequiereTokenHelpers } from '../helpers/RequiereTokenHelpers';

export async function addHilado(datos) {

    let HILADO = {
        producto_terminado: datos.nombre,
        color: datos.color,
        stock_loberia: datos.stock_loberia,
        stock_buenosAires: datos.stock_BuenosAires,
        precio_venta_mayorista: datos.precio_mayorista,
        precio_venta_minorista: datos.precio_minorista
    }
    const ADD_HILADO = "http://localhost:3000/api/hilado";
    return await axios.post(ADD_HILADO, HILADO, { withCredentials: true });
}

export async function getProductoByName() {
    const GET_PRODUCTO_BY_NAME = "http://localhost:3000/api/hiladoNombre";
    return await axios.get(GET_PRODUCTO_BY_NAME, { withCredentials: true });
}

export async function getAllHilado() {
    const URL_GETALL = "http://localhost:3000/api/hilado";
    return await axios.get(URL_GETALL, { withCredentials: true });
}

export async function moverStock(datos) {

    let STOCK = {
        cantidad_tranferida: datos.cantidad,
        origen: datos.origen,
        destino: datos.destino
    }

    const URL_MOVER_STOCK = `http://localhost:3000/api/trasferirStock/${datos.id}`;
    return await axios.put(URL_MOVER_STOCK, STOCK, { withCredentials: true });
}

export async function vender(datos) {

    let token = await RequiereTokenHelpers();

    let VENTA = {
        producto_id: datos.id,
        nombre_prod: datos.nombre_prod,
        color: datos.color,
        cantidad_vendida: datos.cantidad,
        origen: datos.ciudad,
        tipo_venta: datos.tipo_venta,
        fecha: datos.fecha,
        cliente: datos.cliente
    }
    const ADD_VENTA = "http://localhost:3000/api/venta";
    return await axios.post(ADD_VENTA, VENTA, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        withCredentials: true
    });
}

export async function actualizarPrecio(datos) {

    let PRECIO = {
        tipo_consumidor: datos.tipoConsumidor,
        total: datos.total,
    }
    const URL_MODIFICAR_PRECIO = `http://localhost:3000/api/cambiarPrecio/${datos.id}`;
    return await axios.put(URL_MODIFICAR_PRECIO, PRECIO, { withCredentials: true });
}

export async function incrementar_stock(datos) {

    let STOCK = {
        stock: datos.ciudad,
        total: datos.total,
    }
    const URL_INCREMENTAR_STOCK = `http://localhost:3000/api/incrementarMercaderia/${datos.id}`;
    return await axios.put(URL_INCREMENTAR_STOCK, STOCK, { withCredentials: true });
}

export async function getReporteVenta(datos) {
    const URL_REPORTE = `http://localhost:3000/api/reporteVenta/${datos.fechaMin}/${datos.fechaMax}`;
    return await axios.get(URL_REPORTE, { responseType: 'arraybuffer', withCredentials: true });
}