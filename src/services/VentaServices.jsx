import { fetchGetAllDataWithToken } from '../helpers/hooks/servicesHooks/useGetALLData';

// export async function VentaServices(datosEnviados) {
//     const URL_VENTA = "http://localhost:3000/api/venta";
//     let userData = {
//         producto_id: datosEnviados.id,
//         cantidad_vendida: datosEnviados.cantidad,
//         origen: datosEnviados.origen,
//         tipo_venta: datosEnviados.tipo_venta,
//     };
//     return fetchPostDataWithToken(URL_VENTA, userData)
// }

export async function getAllVentas() {
    const URL_GETALL = "http://localhost:3000/api/getAllVentas";
    return fetchGetAllDataWithToken(URL_GETALL)
}

