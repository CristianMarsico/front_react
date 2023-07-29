import axios from 'axios';

export async function LoginServices(datosEnviados) {
    const URL_LOGIN = "http://localhost:3000/api/login";

    let userData = {
        usuario: datosEnviados.usuario,
        pass: datosEnviados.password,
    };

    return await axios.post(URL_LOGIN, userData, { withCredentials: true });
}