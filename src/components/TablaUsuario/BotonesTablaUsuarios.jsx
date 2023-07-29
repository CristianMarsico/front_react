const BotonesTablaUsuarios = ({ user }) => {
    return (
        <>
            <td >
                <button onClick={() => { console.log(user.id) }} className='js-editar'>Editar</button>
                <button onClick={() => { console.log(user.id) }} className='js-borrar'>Eliminar</button>
            </td>
        </>
    )
}
export default BotonesTablaUsuarios