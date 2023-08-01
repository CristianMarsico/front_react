import { useModal } from "../../../helpers/hooks/useModal";
import EditUserModal_Component from "./EditUserModal_Component"

const BotonesTablaUsuarios = ({ user, handleDeleteUser, handleEditUser }) => {

    const [isOpenChangeEditModal, openChangeEditModal, closeChangeEditModal] = useModal();

    return (
        <>
            <td >
                {/* <button onClick={() => { handleEditUser(user.id) }} className='js-editar'>Editar</button> */}
                <button onClick={openChangeEditModal} className='js-editar'>Editar</button>
                <button onClick={() => { handleDeleteUser(user.id) }} className='js-borrar'>Eliminar</button>

            </td>

            <EditUserModal_Component
                isOpen={isOpenChangeEditModal}
                close={closeChangeEditModal}
                user={user}
                handleEditUser={handleEditUser}
            />
        </>
    )
}
export default BotonesTablaUsuarios