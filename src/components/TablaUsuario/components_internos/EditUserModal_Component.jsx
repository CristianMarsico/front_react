import { useEffect, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form'

const EditUserModal_Component = ({ isOpen, close, user, handleEditUser }) => {

    const { register, handleSubmit, formState: { errors, dirtyFields }, reset } = useForm();
    const existenModificaciones = !!Object.keys(dirtyFields).length;
    const [usuario, setUsuario] = useState(user.nombre);

    useEffect(() => {
        if (!isOpen) {
            reset()
        }
    }, [isOpen])

    const onSubmit = (formData) => {
        if (!existenModificaciones) {
            return;
        } else {
            setUsuario(formData.nombre);

            let datos = {
                id: user.id,
                nombre: formData.nombre,
            }
            handleEditUser(datos)
            close()
        }
    }

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
                            name="nombre"
                            defaultValue={usuario}
                            placeholder="Escribe un nuevo nombre"
                            onChange={(e) => setUsuario(e.target.value)}

                            {...register('nombre', {
                                required: {
                                    value: true,
                                    message: "*Campo requerido"
                                },

                            })}
                        />
                        <small className='fail'>{errors?.nombre?.message}</small>
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary"
                    onClick={close}>
                    Cancelar
                </Button>

                <Button
                    variant="danger"
                    onClick={handleSubmit(onSubmit)}
                    disabled={!existenModificaciones}
                >Cambiar nombre
                </Button>
            </Modal.Footer>
        </Modal>

    )
}

export default EditUserModal_Component