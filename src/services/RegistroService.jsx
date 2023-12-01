import axios from 'axios';

/**
 * Realiza una solicitud para registrar un nuevo usuario en la aplicación.
 *
 * @param {Object} datosEnviados - Objeto que contiene los detalles del usuario a registrar.
 * @returns {Promise} Una promesa que resuelve cuando el usuario se registra con éxito o se rechaza si hay un error.
 */
export async function RegistroService(datosEnviados) {
    const URL_REGISTRO = "http://localhost:3000/api/register";

    let userData = {
        nombre: datosEnviados.nombre,
        pass: datosEnviados.password,
        confirm_pass: datosEnviados.confirm_password,
        usuario: datosEnviados.usuario,
        email: datosEnviados.email
    };
    return await axios.post(URL_REGISTRO, userData, { withCredentials: true });
}