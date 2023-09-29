import axios from 'axios';
import { fetchGetAllDataWithToken } from '../helpers/hooks/servicesHooks/useGetALLData';
import { fetchUpdateDataWithToken } from '../helpers/hooks/servicesHooks/useUpdateData';
import { fetchDeleteDataWithToken } from '../helpers/hooks/servicesHooks/useDeleteData';


export async function getMPByName() {
    const URL_MP_GETALL = "http://localhost:3000/api/getMPByName";
    return fetchGetAllDataWithToken(URL_MP_GETALL)
}

export async function getAllMP() {
    const URL_MP_GETALL = "http://localhost:3000/api/getAllMP";
    return fetchGetAllDataWithToken(URL_MP_GETALL)
}


export async function eliminarMateriaPrima(id) {
    const URL_DELETE = `http://localhost:3000/api/deleteMP/${id}`;
    return fetchDeleteDataWithToken(URL_DELETE)
}

export async function actualizarStock(datos) {
    let CANTIDAD = {
        nombre: datos.nombre,
        cantidad: datos.cantidad,
        fecha: datos.fecha
    }
    const URL_ACTUALIZAR_STOCK = `http://localhost:3000/api/updateStock/${datos.id}`;
    return fetchUpdateDataWithToken(URL_ACTUALIZAR_STOCK, CANTIDAD)
}

export async function actualizarMP(datos) {

    let DATA = {
        nombre: datos.nombre,
        precio: datos.precio,
        stock: datos.stock,
    }
    const URL_ACTUALIZAR_MP = `http://localhost:3000/api/updateMP/${datos.id}`;
    return fetchUpdateDataWithToken(URL_ACTUALIZAR_MP, DATA)

}


export async function getReporte(datos) {
    const URL_REPORTE = `http://localhost:3000/api/reporteCompra/${datos.fechaMin}/${datos.fechaMax}`;
    return await axios.get(URL_REPORTE, { responseType: 'arraybuffer', withCredentials: true });
}

export async function getReporteProduccion(datos) {
    const URL_REPORTE = `http://localhost:3000/api/reporteProduccion/${datos.fechaMin}/${datos.fechaMax}`;
    return await axios.get(URL_REPORTE, { responseType: 'arraybuffer', withCredentials: true });
}