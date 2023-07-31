const BotonesTablaUsuarios = ({ user, handleDeleteUser, handleEditUser }) => {

    return (
        <>
            <td >
                <button onClick={() => { handleEditUser(user.id) }} className='js-editar'>Editar</button>
                <button onClick={() => { handleDeleteUser(user.id) }} className='js-borrar'>Eliminar</button>
            </td>
        </>
    )
}
export default BotonesTablaUsuarios