import { useEffect } from 'react';
import { Modal, Form, Alert, Button, FormControl } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom"
import useAuth from "../../../helpers/auth/useAuth"
// helpers / auth / useAuth

// import { RequiereTokenHelpers } from "../helpers/RequiereTokenHelpers"

// import { LogoutServices } from "../services/LogoutServices"

const Edit_User_Modal_Component = ({ isOpen, close }) => {

    const { register, handleSubmit, formState: { errors, dirtyFields }, reset } = useForm();
    const { user, saveUsuerLocal } = useAuth()

    // const navigate = useNavigate()
    const existenModificaciones = !!Object.keys(dirtyFields).length;

    const onSubmit = (formData) => {

        if (!existenModificaciones) {
            return;
        } else {

            let datos = {
                id: user.id,
                user: formData.usuario,
                rol: formData.rol,
            }
            saveUsuerLocal(datos)
            close()
        }
        //Aca iria el fetch

    }

    useEffect(() => {
        if (!isOpen) {
            reset()
        }
    }, [isOpen])

    useEffect(() => {
        if (user) {
            reset({
                usuario: user.usuario,
                rol: user.rol
            })
        }
    }, [])

    return (

        <Modal show={isOpen} onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title>Cambiar Cuenta</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)} >
                    <Form.Group className="mb-8" controlId="exampleForm.ControlInput1">
                        <Form.Label>Editar cuenta</Form.Label>
                        <Form.Control
                            type="text"
                            name='usuario'
                            autoFocus
                            placeholder="Escribe una nueva contraseña"
                            {...register("usuario", {
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
                        <small className='fail'>{errors?.usuario?.message}</small>
                    </Form.Group>


                    <Form.Group>
                        <Form.Label>Rol</Form.Label>
                        <FormControl
                            as="select"
                            name='rol'
                            disabled={user?.rol === 'admin'}
                            {...register("rol")}
                        >
                            <option>regular</option>
                            <option>admin</option>
                        </FormControl>
                        <small className='fail'>{errors?.rol?.message}</small>
                    </Form.Group>

                    {/* <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Example textarea</Form.Label>
                        <Form.Control as="textarea" rows={4} />
                    </Form.Group> */}
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={close}>
                    Cancelar
                </Button>

                <Button
                    variant="danger"
                    onClick={handleSubmit(onSubmit)}
                    disabled={!existenModificaciones}
                >Cambiar cuenta
                </Button>
            </Modal.Footer>
        </Modal>

    )
}

export default Edit_User_Modal_Component