import { useEffect, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { mostrarAlertCompraSuccess, mostrarAlertError } from '../../../../helpers/sweetAlerts/Alerts';
import { getReporte } from '../../../../services/MateriaPrima';
// import BtnCancelar_Components from '../../../botones/BtnCancelar_Components';
// import BtnConfirmar_Components from '../../../botones/BtnConfirmar_Components';
// import InputBasico_Components from '../../../Inputs/InputBasico_Components';

const Modal_Reporte = ({ open, close }) => {

    const { register, handleSubmit, formState: { errors, dirtyFields }, reset } = useForm();

    const [fecha, setFecha] = useState({
        fechaMin: "",
        fechaMax: "",
    });

    let getDatos = (e) => {
        setFecha({
            ...fecha,
            [e.target.name]: e.target.value
        });
    }

    let enviarDatos = async (datosEnviados) => {
        try {
            let response = await getReporte(datosEnviados);
            mostrarAlertCompraSuccess(response.data);
            close(true)
            return;
        } catch (err) {
            if (err.response)
                return mostrarAlertError(err.response.data.error);
            else
                mostrarAlertError("Error de red. Inténtalo más tarde.");
        }
    }

    useEffect(() => {
        if (!open) {
            reset()
        }
    }, [open])

    return (
        <Modal show={open} onHide={close}>
            <Modal.Header className='header-modal' closeButton>
                <Modal.Title>Generar Reporte</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className='form-modal' onSubmit={handleSubmit(enviarDatos)}>
                    <Form.Group className="mb-8" controlId="exampleForm.ControlInput1">
                        <Form.Label>Fecha</Form.Label>
                        <Form.Control
                            type="date"
                            name="fechaMin"
                            placeholder="Ingrese fecha en formato YYYY/MM/DD*"
                            onChange={getDatos}
                            {...register('fechaMin', {
                                required: {
                                    value: true,
                                    message: "*Campo requerido"
                                },

                            })}
                        />
                        <small className='fail'>{errors?.fechaMin?.message}</small>
                    </Form.Group>
                    <Form.Group className="mb-8" controlId="exampleForm.ControlInput1">
                        <Form.Label>Fecha Máxima</Form.Label>
                        <Form.Control
                            type="date"
                            name="fechaMax"
                            placeholder="Ingrese fecha en formato YYYY/MM/DD*"
                            onChange={getDatos}
                            {...register('fechaMax', {
                                required: {
                                    value: true,
                                    message: "*Campo requerido"
                                },

                            })}
                        />
                        <small className='fail'>{errors?.fechaMax?.message}</small>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className="confirmar"
                    onClick={handleSubmit(enviarDatos)}
                    type='submit'
                    variant="primary"
                >Generar Reporte
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

export default Modal_Reporte