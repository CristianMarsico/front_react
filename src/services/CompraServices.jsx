import axios from 'axios';
import { RequiereTokenHelpers } from '../helpers/RequiereTokenHelpers';

export async function CompraServices(datosEnviados, e) {
    const URL_COMPRA = "http://localhost:3000/api/compra";

    let token = await RequiereTokenHelpers();

    let userData = {
        producto: datosEnviados.producto,
        cantidad: datosEnviados.cantidad,
        precio_unitario: datosEnviados.precio_unitario,
        fecha: datosEnviados.fecha,

    };

    return await axios.post(URL_COMPRA, userData, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        withCredentials: true
    });
}