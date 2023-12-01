import axios from 'axios';
/**
 * Realiza una solicitud para eliminar un usuario por su ID.
 *
 * @param {number} id - ID del usuario que se desea eliminar.
 * @returns {Promise} Una promesa que resuelve cuando el usuario se elimina con éxito o se rechaza si hay un error.
 */
export async function eliminarUsuario(id) {
    const URL_DELETE = `http://localhost:3000/api/deleteUser/${id}`;
    return await axios.delete(URL_DELETE, { withCredentials: true });
}

/**
 * Realiza una solicitud para obtener un usuario por su ID.
 *
 * @param {number} id - ID del usuario que se desea obtener.
 * @returns {Promise} Una promesa que resuelve con los detalles del usuario o se rechaza si hay un error.
 */
export async function getUser(id) {
    const URL_DELETE = `http://localhost:3000/api/getUserById/${id}`;
    return await axios.get(URL_DELETE, { withCredentials: true });
}

/**
 * Realiza una solicitud para obtener todos los usuarios en la aplicación.
 *
 * @returns {Promise} Una promesa que resuelve con la lista de usuarios o se rechaza si hay un error.
 */
export async function getAllUsarios() {
    const URL_GETALL = "http://localhost:3000/api/getAll";
    return await axios.get(URL_GETALL, { withCredentials: true });
}

/**
 * Realiza una solicitud para actualizar los datos de un usuario por su ID.
 *
 * @param {Object} user - Objeto que contiene los detalles actualizados del usuario.
 * @returns {Promise} Una promesa que resuelve cuando los datos del usuario se actualizan con éxito o se rechaza si hay un error.
 */
export async function editarUsuario(user) {
    const USUARIO = {
        usuario: user.usuario,
    }
    const URL_UPDATE = `http://localhost:3000/api/updateUser/${user.id}`;
    return await axios.put(URL_UPDATE, USUARIO, { withCredentials: true });
}
