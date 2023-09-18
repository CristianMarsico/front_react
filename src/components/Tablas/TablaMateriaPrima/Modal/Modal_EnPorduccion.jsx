import { useEffect, useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { saveAs } from 'file-saver';
import { useForm } from 'react-hook-form'
import '../../../../css/modals.css'
import { mostrarAlertError } from '../../../../helpers/sweetAlerts/Alerts';
import { getReporteProduccion } from '../../../../services/MateriaPrimaServices';
import InputTypeDate_Components from '../../../Inputs/InputTypeDate_Components';
import BtnConfirmar_Cancelar_Components from '../../BtnConfirmar_Cancelar/BtnConfirmar_Cancelar_Components';

const Modal_EnPorduccion = ({ open, close }) => {
    const { register, handleSubmit, formState: { errors, dirtyFields }, reset } = useForm();
    const existenModificaciones = !!Object.keys(dirtyFields).length;

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
                <Modal.Title>Materia Prima En Produccion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className='form-reporte' onSubmit={handleSubmit(enviarDatos)}>
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
                <BtnConfirmar_Cancelar_Components
                    handleSubmit={handleSubmit}
                    enviarDatos={enviarDatos}
                    existenModificaciones={existenModificaciones}
                    close={close}
                />
            </Modal.Footer>
        </Modal>
    )
}

export default Modal_EnPorduccion