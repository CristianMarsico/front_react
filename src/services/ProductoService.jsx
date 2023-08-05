import axios from 'axios';

export async function getProductoByName() {
    const GET_PRODUCTO_BY_NAME = "http://localhost:3000/api/hiladoNombre";

    return await axios.get(GET_PRODUCTO_BY_NAME, { withCredentials: true });
}
