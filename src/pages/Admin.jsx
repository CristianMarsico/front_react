import useAuth from "../helpers/auth/useAuth"
import DeleteModalComponent from "../components/Admin/DeleteModalComponent"
import CambiarPassModalComponent from "../components/Admin/CambiarPassModalComponent"
import { useModal } from '../helpers/hooks/useModal';
import Edit_User_Modal_Component from "../components/Admin/Edit_User_Modal_Component";
import Perfil from "../images/male_avatar.svg"
import { Button } from "react-bootstrap"
import Card from 'react-bootstrap/Card';

const Admin = () => {

    let { user, getRoleUser } = useAuth()

    const [isOpenDeleteModal, openDeleteModal, closeDeleteModal] = useModal();

    const [isOpenChangePassModal, openChangePassModal, closeChangePassModal] = useModal()

    const [isOpenChangeEditModal, openChangeEditModal, closeChangeEditModal] = useModal()

    return (
        <>
            <Card style={{ width: '25rem', margin: "auto auto", background: "transparent", border: "none" }}>
                <Card.Img variant="top" src={Perfil} style={{ width: '15rem', margin: "auto auto" }} />
                <Card.Body>
                    <Card.Title style={{ textAlign: "center", fontSize: "24px", color: "#fff" }}>{user.usuario}</Card.Title>
                    <Card.Text style={{ textAlign: "center", color: "#fff" }}>
                        {
                            getRoleUser().map((user, index) => (
                                user === "super_admin" ?
                                    <li key={index}> Super Administrador</li>
                                    :
                                    <li key={index}> Administrador</li>
                            )
                            )
                        }
                    </Card.Text>
                    <div className="d-flex justify-content-center">
                        <Button variant="primary" style={{ width: '15rem' }} onClick={openChangeEditModal}>
                            Editar Cuenta
                        </Button>
                    </div>
                    <div className="d-flex justify-content-center">
                        <Button variant="secondary" style={{ width: '15rem', marginTop: "0.5rem" }} onClick={openChangePassModal}>
                            Cambiar Contraseña
                        </Button>
                    </div>
                    <div className="d-flex justify-content-center">
                        <Button variant="danger" style={{ width: '15rem', marginTop: "0.5rem" }} onClick={openDeleteModal}>
                            Eliminar Cuenta
                        </Button>
                    </div>
                </Card.Body>
            </Card>

            <DeleteModalComponent
                isOpen={isOpenDeleteModal}
                close={closeDeleteModal} />

            <CambiarPassModalComponent
                isOpen={isOpenChangePassModal}
                close={closeChangePassModal} />

            <Edit_User_Modal_Component
                isOpen={isOpenChangeEditModal}
                close={closeChangeEditModal}
            />
        </>
    )
}

export default Admin