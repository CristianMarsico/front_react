import { useModal } from '../../helpers/hooks/useModal';
import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import useAuth from "../../helpers/auth/useAuth"
import { getUser } from "../../services/UserServices"
import Foto from "../../images/male_avatar.svg"
import ModalEditUserName_Components from "./Modal/ModalEditUserName_Components"
import '../../css/cuentaUsuario.css'

const GeneralPerfil_Components = () => {
    let { user } = useAuth()


    let [visible, setVisible] = useState(false)

    const cambiar = () => {
        setVisible(!visible)
    }

    const [isOpenChangePassModal, openChangePassModal, closeChangePassModal] = useModal()
    const [isOpenChangeEditModal, openChangeEditModal, closeChangeEditModal] = useModal()
    let [usuario, setUsuario] = useState("")


    const fetchDatos = async () => {
        try {
            const response = await getUser(user.id);

            console.log(response)
            setUsuario(response.data)
        } catch (err) {
            if (err) {
                setUsuario("")
            } else {
                console.log(err);
            }
        }
    };

    console.log(usuario)

    useEffect(() => {
        fetchDatos();
    }, []);


    return (
        <>

            <div className="root-perfil">

                <img src={Foto} alt="perfil" />
                <h3>{usuario.user}</h3>
                <Button onClick={cambiar}>Opciones</Button>

                {
                    visible &&
                    <div className="opciones">
                        <Button variant="primary" onClick={openChangeEditModal}>
                            Editar Cuenta
                        </Button>
                        <Button variant="warning" onClick={openChangePassModal}>
                            Editar Pass
                        </Button>

                    </div>
                }
            </div>
            {/* 
            <CambiarPassModalComponent
                isOpen={isOpenChangePassModal}
                close={closeChangePassModal}
                fetchMateriaPrima={fetchDatos}
                materiaPrima={respuesta} /> */}

            <ModalEditUserName_Components
                isOpen={isOpenChangeEditModal}
                close={closeChangeEditModal}
                fetchUsuario={fetchDatos}
                usuario={usuario}
            />
        </>
    )
}

export default GeneralPerfil_Components