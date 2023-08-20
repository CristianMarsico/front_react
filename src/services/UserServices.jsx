import axios from 'axios';

export async function eliminarUsuario(id) {
    const URL_DELETE = `http://localhost:3000/api/deleteUser/${id}`;
    return await axios.delete(URL_DELETE, { withCredentials: true });
}

export async function getAllUsarios() {
    const URL_GETALL = "http://localhost:3000/api/getAll";
    return await axios.get(URL_GETALL, { withCredentials: true });
}

export async function editarUsuario(user) {

    const USUARIO = {
        nombre: user.nombre,
        email: user.email
    }
    const URL_UPDATE = `http://localhost:3000/api/updateUser/${user.id}`;
    return await axios.put(URL_UPDATE, USUARIO, { withCredentials: true });
}
