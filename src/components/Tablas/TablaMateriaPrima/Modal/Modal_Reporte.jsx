import { useEffect, useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { mostrarAlertCompraSuccess, mostrarAlertError } from '../../../../helpers/sweetAlerts/Alerts';
import { getReporte } from '../../../../services/MateriaPrima';
import BtnCancelar_Components from '../../../botones/BtnCancelar_Components';
import BtnConfirmar_Components from '../../../botones/BtnConfirmar_Components';
import InputBasico_Components from '../../../Inputs/InputBasico_Components';

const Modal_Reporte = ({ open, close }) => {

    const { register, handleSubmit, formState: { errors, dirtyFields }, reset } = useForm();
    // const [showInput, setShowInput] = useState(false);
    // const existenModificaciones = !!Object.keys(dirtyFields).length;

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

    let enviarDatos = async (datosEnviados, e) => {
        try {

            let response = await getReporte(datosEnviados);
            mostrarAlertCompraSuccess(response.data);
            e.target.reset();
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

                    <InputBasico_Components
                        type="date"
                        name="fechaMin"
                        label="Minimo"
                        placeholder="formato YYYY/MM/DD*"
                        register={register}
                        required={true}
                        getDatos={getDatos}
                        errors={errors}
                    />
                    <InputBasico_Components
                        type="date"
                        name="fechaMax"
                        label="Maximo"
                        placeholder="formato YYYY/MM/DD*"
                        register={register}
                        required={true}
                        getDatos={getDatos}
                        errors={errors}
                    />
                    <BtnConfirmar_Components
                        variant="primary"
                        width="40%"
                        nombreAccion="Descargar Reporte"
                        padding=".4rem"
                    // disabled={!existenModificaciones}
                    />
                    <BtnCancelar_Components
                        variant="secondary"
                        width="40%"
                        nombreAccion="Cancelar"
                        padding=".4rem"
                        close={close}
                    />
                </Form>
            </Modal.Body>

            {/* <Modal.Footer>
                <h1>fdf</h1>
            </Modal.Footer> */}
        </Modal>
    )
}

export default Modal_Reporte