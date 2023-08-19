import { useEffect, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { saveAs } from 'file-saver';
import { mostrarAlertError } from '../../../../helpers/sweetAlerts/Alerts';
import { getReporte } from '../../../../services/MateriaPrimaServices';
import InputTypeDate_Components from '../../../Inputs/InputTypeDate_Components';

const Modal_Reporte = ({ open, close }) => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

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
            if (response.status === 200) {
                const fileContent = response.data;
                const blob = new Blob([fileContent]);
                const nombreArchivo = 'reporteCompra.pdf';
                saveAs(blob, nombreArchivo);
                close(true)
                return;
            }
        } catch (err) {
            if (err.response) {
                console.log(err.response)
                return mostrarAlertError(err.response.data.error);
            }
            else
                mostrarAlertError("Error de red. Inténtalo más tarde.");
        }
    }

    useEffect(() => {
        if (!open) {
            reset()
        }
    }, [open])

    const fechaActual = new Date().toISOString().split('T')[0];

    return (
        <Modal show={open} onHide={close}>
            <Modal.Header className='header-modal' closeButton>
                <Modal.Title>Generar Reporte</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className='form-modal' onSubmit={handleSubmit(enviarDatos)}>
                    <InputTypeDate_Components
                        type="date"
                        label="Fecha"
                        name="fechaMin"
                        placeholder="Ingrese fecha en formato YYYY/MM/DD*"
                        onChange={getDatos}
                        register={register}
                        errors={errors}
                        max={fechaActual}
                    />
                    <InputTypeDate_Components
                        type="date"
                        label="Fecha Máxima"
                        name="fechaMax"
                        placeholder="Ingrese fecha en formato YYYY/MM/DD*"
                        onChange={getDatos}
                        register={register}
                        errors={errors}
                        max={fechaActual}
                    />
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