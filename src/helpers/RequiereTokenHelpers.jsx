

export async function RequiereTokenHelpers() {

    const URL_REFRESH = "http://localhost:3000/api/refreshToken";
    try {
        let res_token = await fetch(URL_REFRESH, {
            credentials: "include",
        })

        let { token } = await res_token.json();

        return token
    } catch (error) {
        console.log(error)

    }


}