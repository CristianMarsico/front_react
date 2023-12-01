/**
 * Esta función realiza una solicitud para eliminar un usuario de la aplicación.
 *
 * @param {string} id - El identificador del usuario que se va a eliminar.
 * @param {string} token - El token de autenticación necesario para realizar la solicitud.
 */
export const DeleteUser = async (id, token) => {
    console.log(id)
    const URL_DELETE = `http://localhost:3000/api/deleteUser/${id}`;
    try {

        let response = await fetch(URL_DELETE, {
            "method": "DELETE",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            credentials: "include",
        });

        if (response.ok) {
            await response.json()

        }
    }
    catch (e) {
        console.log(e)
    }
}