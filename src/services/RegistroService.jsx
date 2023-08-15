import axios from 'axios';

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