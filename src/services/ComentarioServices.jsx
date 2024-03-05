import { fetchGetAllDataWithToken } from "../helpers/hooks/servicesHooks/useGetALLData";
import { fetchPostDataWithToken } from "../helpers/hooks/servicesHooks/usePostData";
import { fetchDeleteDataWithToken } from "../helpers/hooks/servicesHooks/useDeleteData";

export function getAllComentarios(id) {
    const URL_GETALL = `http://localhost:3000/api/getAllComentarios/${id}`;
    return fetchGetAllDataWithToken(URL_GETALL)
}


/**
 * Realiza una solicitud para crear un comentario.
 *
 * @param {Object} datosEnviados - Los datos de la compra a enviar.
 * @param {string} datosEnviados.comentario - El comentario a agregar.
 * @param {number} datosEnviados.id_cliente - Referencia del cliente.
 * @returns {Promise} - Una promesa que se resolverá con los datos de la respuesta de la solicitud.
 */
export function addComentario(id_cliente, datosEnviados) {
    const URL_COMENTARIO = "http://localhost:3000/api/addComentario";
    let coment = {
        comentario: datosEnviados.comentario,
        id_cliente
    };
    return fetchPostDataWithToken(URL_COMENTARIO, coment)
}



/**
 * Realiza una solicitud para eliminar una materia prima por su ID.
 *
 * @param {number} id - ID de la materia prima que se va a eliminar.
 * @returns {Promise} Una promesa que resuelve cuando se elimina la materia prima con éxito o se rechaza si hay un error.
 */
export async function eliminarComentarios(id) {
    
    const URL_DELETE = `http://localhost:3000/api/deleteComentario/${id}`;
    return fetchDeleteDataWithToken(URL_DELETE)
}