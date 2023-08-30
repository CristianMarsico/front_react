import axios from 'axios';

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
