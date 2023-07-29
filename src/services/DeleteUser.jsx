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