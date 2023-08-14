import axios from 'axios';

export async function getMPByName() {
    const URL_MP_GETALL = "http://localhost:3000/api/getMPByName";

    return await axios.get(URL_MP_GETALL, { withCredentials: true });
}

export async function getAllMP() {
    const URL_MP_GETALL = "http://localhost:3000/api/getAllMP";

    return await axios.get(URL_MP_GETALL, { withCredentials: true });
}


export async function eliminarMateriaPrima(id) {
    const URL_DELETE = `http://localhost:3000/api/deleteMP/${id}`;

    return await axios.delete(URL_DELETE, { withCredentials: true });
}

export async function actualizarStock(datos) {

    let CANTIDAD = {
        nombre: datos.nombre,
        cantidad: datos.cantidad
    }
    const URL_ACTUALIZAR_STOCK = `http://localhost:3000/api/updateStock/${datos.id}`;
    return await axios.put(URL_ACTUALIZAR_STOCK, CANTIDAD, { withCredentials: true });
}

export async function actualizarMP(datos) {

    let DATA = {
        nombre: datos.nombre,
        stock: datos.stock,
    }
    const URL_ACTUALIZAR_MP = `http://localhost:3000/api/updateMP/${datos.id}`;
    return await axios.put(URL_ACTUALIZAR_MP, DATA, { withCredentials: true });
}


export async function getReporte(datos) {

    const URL_REPORTE = `http://localhost:3000/api/reporteCompra/${datos.fechaMin}/${datos.fechaMax}`;
    return await axios.get(URL_REPORTE, { withCredentials: true });
}