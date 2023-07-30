import axios from 'axios';
export async function eliminarUsuario(id) {
    const URL_DELETE = `http://localhost:3000/api/deleteUser/${id}`;

    return await axios.delete(URL_DELETE, { withCredentials: true });
}
