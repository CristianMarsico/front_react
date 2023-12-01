import axios from 'axios';

/**
 * Realiza una solicitud para iniciar sesión de usuario en la aplicación.
 *
 * @param {Object} datosEnviados - Objeto que contiene los datos de inicio de sesión del usuario.
 * @param {string} datosEnviados.usuario - Nombre de usuario o identificación del usuario.
 * @param {string} datosEnviados.password - Contraseña del usuario.
 * @returns {Promise} Una promesa que resuelve con los datos de inicio de sesión o se rechaza si hay un error.
 */
export async function LoginServices(datosEnviados) {
    const URL_LOGIN = "http://localhost:3000/api/login";

    let userData = {
        usuario: datosEnviados.usuario,
        pass: datosEnviados.password,
    };

    return await axios.post(URL_LOGIN, userData, { withCredentials: true });
}