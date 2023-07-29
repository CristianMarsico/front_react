import { useEffect } from 'react';
import { Modal, Form, Alert, Button } from 'react-bootstrap';

import { useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom"
import useAuth from "../../helpers/auth/useAuth"


// import { RequiereTokenHelpers } from "../helpers/RequiereTokenHelpers"

// import { LogoutServices } from "../services/LogoutServices"

const CambiarPassModalComponent = ({ isOpen, close }) => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    // const { deleteUserLocal, user } = useAuth()

    const navigate = useNavigate()

    const onSubmit = (formData) => {
        console.log(formData)
        //Aca iria el fetch
        alert("Cambiando contraseña")
    }

    useEffect(() => {
        if (!isOpen) {
            reset()
        }
    }, [isOpen])

    // const eliminarUsuario = async () => {

    //     let token = await RequiereTokenHelpers()

    //     deleteUserLocal();
    //     await LogoutServices();
    //     navigate("/")
    // }

    return (

        <Modal show={isOpen} onHide={close} >
            <Modal.Header closeButton>
                <Modal.Title>Cambias Pass</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Nueva contraseña</Form.Label>
                        <Form.Control
                            autoFocus
                            type="password"
                            placeholder="Escribe una nueva contraseña"
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: "*Campo requerido"
                                },
                                minLength: {
                                    value: 4,
                                    message: "*El minimo son 4 caracteres"
                                },
                                maxLength: {
                                    value: 20,
                                    message: "*El maximo son 20 caracteres"
                                },
                            })}
                        />
                        <small className='fail'>{errors?.password?.message}</small>
                    </Form.Group>
                    {/* ACA IRIA OTRO */}
                    {/* <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    > */}
                </Form>
            </Modal.Body>

            <Modal.Footer style={{ display: 'flex', flexDirection: 'row' }}>
                <Button style={{ width: 'auto', textAlign: 'center' }} variant="secondary" onClick={close}>Cancelar</Button>
                <Button style={{ width: 'auto', textAlign: 'center' }} variant="danger" onClick={handleSubmit(onSubmit)}>Cambiar</Button>
            </Modal.Footer>
        </Modal>


    )
}

export default CambiarPassModalComponent