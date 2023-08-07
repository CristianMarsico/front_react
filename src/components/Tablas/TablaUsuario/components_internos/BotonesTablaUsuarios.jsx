import { Button } from "react-bootstrap";
import { useModal } from "../../../../helpers/hooks/useModal";
import EditUserModal_Component from "./EditUserModal_Component"

const BotonesTablaUsuarios = ({ user, handleDeleteUser, handleEditUser }) => {

    const [isOpenChangeEditModal, openChangeEditModal, closeChangeEditModal] = useModal();

    return (
        <>
            <td className="dimensionBtn">
                <Button
                    variant="danger"
                    onClick={() => { handleDeleteUser(user.id) }}
                    style={{ margin: '4px' }}
                >Eliminar
                </Button>
                <Button
                    variant="primary"
                    className="ml-5"
                    onClick={openChangeEditModal}
                >Editar
                </Button>
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