import axios from 'axios';
// import { RequiereTokenHelpers } from '../helpers/RequiereTokenHelpers';

export async function VentaServices(datosEnviados, e) {
    const URL_VENTA = "http://localhost:3000/api/venta";

    // let token = await RequiereTokenHelpers();

    let userData = {
        producto_id: datosEnviados.id,
        cantidad_vendida: datosEnviados.cantidad,
        origen: datosEnviados.origen,
        tipo_venta: datosEnviados.tipo_venta,

    };
    console.log("userData")

    console.log(userData)

    return await axios.post(URL_VENTA, userData, {
        // headers: {
        //     'Authorization': `Bearer ${token}`
        // },
        withCredentials: true
    });
}