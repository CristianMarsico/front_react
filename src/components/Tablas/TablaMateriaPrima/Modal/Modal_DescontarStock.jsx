import { useEffect } from 'react';
import { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { alertWarning } from '../../../../helpers/sweetAlerts/Alerts';
import { getTextDescontarStock } from '../../../../helpers/sweetAlerts/Texts_alerts';
import InputBasico_Components from '../../../Inputs/InputBasico_Components';
import InputTypeDate_Components from '../../../Inputs/InputTypeDate_Components';
import BtnConfirmar_Cancelar_Components from '../../BtnConfirmar_Cancelar/BtnConfirmar_Cancelar_Components';

const Modal_DescontarStock = ({ isOpen, close, mp, descontarStock }) => {

    const { register, handleSubmit, formState: { errors, dirtyFields }, reset } = useForm();
    const existenModificaciones = !!Object.keys(dirtyFields).length;
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setModalOpen(true);
        } else {
            setModalOpen(false);
            reset();
        }
    }, [isOpen, reset]);

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
            let isTrue = await alertWarning("Enviar a produccion ?",getTextDescontarStock(STOCK))
            if (isTrue)
                descontarStock(STOCK)
        } catch (err) {
            return { error: `algo ha salido mal ${err}` }
        }
    }
    const fechaActual = new Date().toISOString().split('T')[0];

    return (
        <Modal show={isOpen} onHide={close}>
            <Modal.Header className='header-modal' closeButton>
                <Modal.Title>Retirar stock de: <span className='span-mp-name'>{mp.nombre}</span></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className='form-modal' onSubmit={handleSubmit(enviarDatos)}>
                    <InputBasico_Components
                        type="text"
                        label="Cantidad"
                        name="cantidad"
                        placeholder="Ingrese la cantidad a retirar*"
                        onChange={getDatos}
                        register={register}
                        errors={errors}
                        defaultValue=""
                    />
                    <InputTypeDate_Components
                        type="date"
                        label="Fecha"
                        name="fechaProduccion"
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
export default Modal_DescontarStock