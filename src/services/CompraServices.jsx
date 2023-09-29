import { fetchGetAllDataWithToken } from "../helpers/hooks/servicesHooks/useGetALLData";
import { fetchPostDataWithToken } from "../helpers/hooks/servicesHooks/usePostData";

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

export function getAllCompras() {
    const URL_GETALL = "http://localhost:3000/api/getAllCompras";
    return fetchGetAllDataWithToken(URL_GETALL)
}