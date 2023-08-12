import { useEffect, useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import BtnCancelar_Components from '../../../botones/BtnCancelar_Components';
import BtnConfirmar_Components from '../../../botones/BtnConfirmar_Components';
const Modal_UpdateMP = ({ isOpen, close, mp, editarMP }) => {

    const { register, handleSubmit, formState: { errors, dirtyFields }, reset } = useForm();
    const existenModificaciones = !!Object.keys(dirtyFields).length;
    const [mprima, setMprima] = useState(mp);

    useEffect(() => {
        if (!isOpen) {
            reset()
        }
    }, [isOpen])

    const enviarDatos = (formData) => {
        try {
            let datos = {
                id: mp.id,
                nombre: formData.nombre,
                stock: formData.stock,
            }
            setMprima(datos)
            editarMP(datos)
            close(true)
        } catch (err) {
            return { error: `algo ha salido mal ${err}` }
        }
    }


    return (
        <Modal show={isOpen} onHide={close}>
            <Modal.Header className='header-modal' closeButton>
                <Modal.Title>Modificar: {mp.nombre}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form className='form-modal' onSubmit={handleSubmit(enviarDatos)}>
                    <Form.Group className="mb-8" controlId="exampleForm.ControlInput1">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            name="nombre"
                            defaultValue={mprima.nombre}
                            placeholder="Escribe un nuevo nombre"
                            onChange={(e) => setMprima(e.target.value)}

                            {...register('nombre', {
                                required: {
                                    value: true,
                                    message: "*Campo requerido"
                                },

                            })}
                        />
                        <small className='fail'>{errors?.nombre?.message}</small>
                    </Form.Group>

                    <Form.Group className="mb-8" controlId="exampleForm.ControlInput1">
                        <Form.Label>Stock</Form.Label>
                        <Form.Control
                            type="text"
                            name="stock"
                            defaultValue={mprima.stock}
                            placeholder="Escribe un nuevo nombre"
                            onChange={(e) => setMprima(e.target.value)}

                            {...register('stock', {
                                required: {
                                    value: true,
                                    message: "*Campo requerido"
                                },

                            })}
                        />
                        <small className='fail'>{errors?.stock?.message}</small>
                    </Form.Group>

                    <BtnConfirmar_Components
                        variant="primary"
                        width="100%"
                        nombreAccion="Confirmar"
                        padding=".4rem"
                        close={close}
                        disabled={!existenModificaciones}
                    />
                    <BtnCancelar_Components
                        variant="secondary"
                        width="100%"
                        nombreAccion="Cancelar"
                        padding=".4rem"
                        close={close}
                    />

                </Form>
            </Modal.Body>

            {/* <Modal.Footer>

            </Modal.Footer> */}
        </Modal>
    )
}

export default Modal_UpdateMP