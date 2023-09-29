"use strict";
import { fetchGetAllDataWithToken } from "../helpers/hooks/servicesHooks/useGetALLData";
import { fetchUpdateDataWithToken } from "../helpers/hooks/servicesHooks/useUpdateData";


export async function getAllClientes() {
    const URL_GETALL = 'http://localhost:3000/api/getAllClientes';
    return fetchGetAllDataWithToken(URL_GETALL);
}

export async function actualizarCliente(datos) {

    let DATA = {
        direccion: datos.direccion,
        email: datos.email,
        telefono: datos.telefono,
    }

    console.log(DATA)
    const URL_ACTUALIZAR_CLIENTE = `http://localhost:3000/api/updateCliente/${datos.id}`;
    return fetchUpdateDataWithToken(URL_ACTUALIZAR_CLIENTE, DATA)

}