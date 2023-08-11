import { Button } from "react-bootstrap";
import { useModal } from "../../../../helpers/hooks/useModal";
import EditUserModal_Component from "./EditUserModal_Component"

const BotonesTablaUsuarios = ({ user, handleDeleteUser, handleEditUser, moverStock }) => {

    const [isOpenChangeEditModal, openChangeEditModal, closeChangeEditModal] = useModal();



    return (
        <>
            <td className="td_btn">
                <Button className="dimensionBtn"
                    variant="danger"
                    onClick={() => { handleDeleteUser(user.id) }}
                >Eliminar
                </Button>

                <Button className="dimensionBtn"
                    variant="primary"
                    onClick={openChangeEditModal}
                >Editar
                </Button>
            </td >

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