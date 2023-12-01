/**
 * Realiza una solicitud para cerrar la sesión de usuario en la aplicación.
 *
 * @returns {Promise} Una promesa que resuelve cuando la sesión de usuario se cierra con éxito o se rechaza si hay un error.
 */
export const LogoutServices = async () => {
    const URL_LOGOUT = "http://localhost:3000/api/logout";

    try {

        let response = await fetch(URL_LOGOUT, {
            method: 'GET',
            credentials: 'include'
        });

        const data = await response.json()

        if (response.ok) {
            return data
        } else {
            throw new Error(data.error)
        }
    }
    catch (e) {
        return e
    }

}