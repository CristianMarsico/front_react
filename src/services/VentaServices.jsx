import axios from 'axios';
import { RequiereTokenHelpers } from '../helpers/RequiereTokenHelpers';

export async function VentaServices(datosEnviados, e) {
    const URL_VENTA = "http://localhost:3000/api/venta";

    let token = await RequiereTokenHelpers();

    let userData = {
        producto_id: datosEnviados.id,
        cantidad_vendida: datosEnviados.cantidad,
        origen: datosEnviados.origen,
        tipo_venta: datosEnviados.tipo_venta,

    };
    return await axios.post(URL_VENTA, userData, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        withCredentials: true
    });
}

export async function getAllVentas() {
    let token = await RequiereTokenHelpers();
    const URL_GETALL = "http://localhost:3000/api/getAllVentas";
    return await axios.get(URL_GETALL, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        withCredentials: true
    });
}