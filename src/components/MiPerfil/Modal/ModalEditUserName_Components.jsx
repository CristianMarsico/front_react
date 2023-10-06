import { useEffect, useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { mostrarAlertCompraSuccess, mostrarAlertError } from '../../../helpers/sweetAlerts/Alerts';
import { editarUsuario } from '../../../services/UserServices';

import InputBasico_Components from '../../Inputs/InputBasico_Components';
import BtnConfirmar_Cancelar_Components from '../../Tablas/BtnConfirmar_Cancelar/BtnConfirmar_Cancelar_Components';

const ModalEditUserName_Components = ({ isOpen, close, fetchUsuario, usuario }) => {

    const { register, handleSubmit, formState: { errors, dirtyFields }, reset } = useForm();
    const existenModificaciones = !!Object.keys(dirtyFields).length;

    const [datos, setDatos] = useState({
        usuario: "",
    });

    let getDatos = (e) => {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        });
    }

    let enviarDatos = async (datosEnviados) => {
        try {

            let U = {
                usuario: datosEnviados.usuario,
                id: usuario.id
            }

            let response = await editarUsuario(U);
            mostrarAlertCompraSuccess(response.data);
            fetchUsuario();
            localStorage.setItem("Usuario", usuario.user)
            close(true)
            return;
        } catch (err) {
            console.log(err)
            if (err.response)
                return mostrarAlertError(err.response.data.error);
            else
                mostrarAlertError("Error de red. Inténtalo más tarde.");
        }
    }

    useEffect(() => {
        if (!isOpen) {
            reset()
        }
    }, [isOpen])


    return (

        <Modal show={isOpen} onHide={close}>
            <Modal.Header className='header-modal' closeButton>
                <Modal.Title>Editar Usuario </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className='form-modal' onSubmit={handleSubmit(enviarDatos)}>
                    <InputBasico_Components
                        type="text"
                        label="Usuario"
                        name="usuario"
                        placeholder="Ingrese Usuario*"
                        onChange={getDatos}
                        register={register}
                        errors={errors}
                        defaultValue=""
                    />

                </Form>
            </Modal.Body>

            <Modal.Footer>
                <BtnConfirmar_Cancelar_Components
                    handleSubmit={handleSubmit}
                    enviarDatos={enviarDatos}
                    existenModificaciones={existenModificaciones}
                    close={close}
                />
            </Modal.Footer>
        </Modal>
    )
}

export default ModalEditUserName_Components