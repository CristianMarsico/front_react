import { Modal, Alert, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import useAuth from "../../helpers/auth/useAuth"
import { RequiereTokenHelpers } from "../../helpers/RequiereTokenHelpers"
import { DeleteUser } from "../../services/DeleteUser"
import { LogoutServices } from "../../services/LogoutServices"

const DeleteModalComponent = ({ isOpen, close }) => {

    const { deleteUserLocal, user } = useAuth()

    const navigate = useNavigate()

    const eliminarUsuario = async () => {

        let token = await RequiereTokenHelpers()
        // await DeleteUser(user.id, token)
        deleteUserLocal();
        await LogoutServices();
        navigate("/")
    }

    return (

        <Modal show={isOpen} onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title>Eliminar</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Alert variant="danger">
                    Estás seguro que deseas eliminar ? <b>se perderán tus datos</b>
                </Alert>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={close}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={eliminarUsuario}>
                    Guardar Cambios
                </Button>
            </Modal.Footer>

        </Modal>

    )
}

export default DeleteModalComponent