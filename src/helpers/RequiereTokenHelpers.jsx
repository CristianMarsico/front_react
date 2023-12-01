/**
 * Realiza una solicitud al servidor para obtener un nuevo token de autenticación.
 * @returns {Promise<string>} Una promesa que resuelve en un nuevo token de autenticación.
 */
export async function RequiereTokenHelpers() {

    const URL_REFRESH = "http://localhost:3000/api/refreshToken";
    try {
        // Realiza una solicitud al servidor para obtener un nuevo token de autenticación.
        let res_token = await fetch(URL_REFRESH, {
            credentials: "include",
        })

        // Extrae el token del cuerpo de la respuesta.
        let { token } = await res_token.json();

        // Devuelve el nuevo token de autenticación.
        return token
    } catch (error) {
        console.log(error)
    }
}