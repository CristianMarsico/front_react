import { eliminarUsuario } from "../../services/UserServices"

const BotonesTablaUsuarios = ({ user }) => {

    async function eliminar(id) {
        try {
            console.log(id)
            let response = await eliminarUsuario(id);
            console.log(response)
            return;
        } catch (err) {
            if (err.response)
                console.log("first")
            else
                console.log("first")
        }

    }

    return (
        <>
            <td >
                <button onClick={() => { console.log(user.id) }} className='js-editar'>Editar</button>
                <button onClick={() => { eliminar(user.id) }} className='js-borrar'>Eliminar</button>
            </td>
        </>
    )
}
export default BotonesTablaUsuarios