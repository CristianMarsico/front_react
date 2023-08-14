import { useEffect, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { alertWarningUpdate } from '../../../../helpers/sweetAlerts/Alerts';

const Modal_UpdateMP = ({ isOpen, close, mp, editarMP }) => {

    const { register, handleSubmit, formState: { errors, dirtyFields }, reset } = useForm();
    const existenModificaciones = !!Object.keys(dirtyFields).length;
    const [mprima, setMprima] = useState(mp);

    useEffect(() => {
        if (!isOpen) {
            reset()
        }
    }, [isOpen])

    let enviarDatos = async (formData) => {
        try {
            let datos = {
                id: mp.id,
                nombre: formData.nombre,
                stock: formData.stock,
            }
            setMprima(datos)
            let isTrue = await alertWarningUpdate(datos)
            if (isTrue) {
                editarMP(datos)
                close(true)
            }
        } catch (err) {
            return { error: `algo ha salido mal ${err}` }
        }
    }

    return (
        <Modal show={isOpen} onHide={close}>
            <Modal.Header className='header-modal' closeButton>
                <Modal.Title>Desea modificar: <span className='span-mp-name'>{mp.nombre}</span></Modal.Title>
            </Modal.Header>

            <Modal.Body className='a' >
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
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button className="confirmar"
                    onClick={handleSubmit(enviarDatos)}
                    type='submit'
                    variant="primary"
                    disabled={!existenModificaciones}>
                    Confirmar
                </Button>
                <Button className="cancelar"
                    variant="secondary"
                    onClick={close}>
                    Cancelar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
export default Modal_UpdateMP