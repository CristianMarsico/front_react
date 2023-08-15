import { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { alertWarningStock } from '../../../../helpers/sweetAlerts/Alerts';

const Modal_DescontarStock = ({ isOpen, close, mp, descontarStock }) => {

    const { register, handleSubmit, formState: { errors, dirtyFields }, reset } = useForm();
    const existenModificaciones = !!Object.keys(dirtyFields).length;
    const [datos, setDatos] = useState({
        cantidad: "",
        fechaProduccion: ""
    });

    let getDatos = (e) => {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        });
    }

    let enviarDatos = async (datosEnviados) => {
        try {
            const STOCK = {
                id: mp.id,
                nombre: mp.nombre,
                cantidad: datosEnviados.cantidad,
                fecha: datosEnviados.fechaProduccion
            }
            let isTrue = await alertWarningStock(STOCK)
            if (isTrue) {
                descontarStock(STOCK)
                reset();
                close(true)
            }
        } catch (err) {
            return { error: `algo ha salido mal ${err}` }
        }
    }

    return (
        <Modal show={isOpen} onHide={close}>
            <Modal.Header className='header-modal' closeButton>
                <Modal.Title>Retirar stock de: <span className='span-mp-name'>{mp.nombre}</span></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className='form-modal' onSubmit={handleSubmit(enviarDatos)}>
                    <Form.Group className="mb-8" controlId="exampleForm.ControlInput1">
                        <Form.Label>Cantidad</Form.Label>
                        <Form.Control
                            type="text"
                            name="cantidad"
                            placeholder="Ingrese la cantiadad a retirar"
                            onChange={getDatos}
                            {...register('cantidad', {
                                required: {
                                    value: true,
                                    message: "*Campo requerido"
                                },

                            })}
                        />
                        <small className='fail'>{errors?.cantidad?.message}</small>
                    </Form.Group>

                    <Form.Group className="mb-8" controlId="exampleForm.ControlInput1">
                        <Form.Label>Fecha de envio a producción</Form.Label>
                        <Form.Control
                            type="date"
                            name="fechaProduccion"
                            placeholder="Ingrese fecha envio a producción"
                            onChange={getDatos}
                            {...register('fechaProduccion', {
                                required: {
                                    value: true,
                                    message: "*Campo requerido"
                                },

                            })}
                        />
                        <small className='fail'>{errors?.fechaProduccion?.message}</small>
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button className="confirmar"
                    onClick={handleSubmit(enviarDatos)}
                    type='submit'
                    variant="primary"
                    disabled={!existenModificaciones}
                >Confirmar
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
export default Modal_DescontarStock