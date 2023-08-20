import { useEffect, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { saveAs } from 'file-saver';
import { useForm } from 'react-hook-form'
import { mostrarAlertError } from '../../../../helpers/sweetAlerts/Alerts';
import { getReporteProduccion } from '../../../../services/MateriaPrimaServices';
import InputTypeDate_Components from '../../../Inputs/InputTypeDate_Components';

const Modal_EnPorduccion = ({ open, close }) => {
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
    useEffect(() => {
        if (!open) {
            reset()
        }
    }, [open])

    let enviarDatos = async (datosEnviados) => {
        try {
            let response = await getReporteProduccion(datosEnviados);
            const contentType = response.headers['content-type'];
            if (contentType === 'application/pdf') {
                const fileContent = response.data;
                const blob = new Blob([fileContent], { type: 'application/pdf' });
                const nombreArchivo = 'Reporte En Produccion.pdf';
                saveAs(blob, nombreArchivo);
                close(true);
            } else {
                mostrarAlertError('Error de red. Inténtalo más tarde.');
            }
        } catch (error) {
            mostrarAlertError('No se ha enviado nada a producción en esas fechas');
        }
    }

    const fechaActual = new Date().toISOString().split('T')[0];

    return (
        <Modal show={open} onHide={close}>
            <Modal.Header className='header-modal' closeButton>
                <Modal.Title>Materia prima en produccion</Modal.Title>
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

export default Modal_EnPorduccion