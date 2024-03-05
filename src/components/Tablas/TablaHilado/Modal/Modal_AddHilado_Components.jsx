import { useEffect, useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import InputBasico_Components from '../../../Inputs/InputBasico_Components';
import '../../../../css/modals.css'
import { addHilado } from '../../../../services/ProductoService';
import { alertSuccess, alertWarning, mostrarAlertError } from '../../../../helpers/sweetAlerts/Alerts';
import BtnConfirmar_Cancelar_Components from '../../BtnConfirmar_Cancelar/BtnConfirmar_Cancelar_Components';
import { getText, getTextCompraHilado } from '../../../../helpers/sweetAlerts/Texts_alerts';

/**
 * Componente para el modal de agregar un nuevo hilado.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {boolean} props.isOpen - Estado que indica si el modal está abierto.
 * @param {function} props.close - Función para cerrar el modal.
 * @param {function} props.fetchHilado - Función para actualizar la información de los hilados.
 * @param {Object} props.hilado - Datos del hilado a editar (si se proporcionan).
 */
const Modal_AddHilado_Components = ({ isOpen, close, fetchHilado, hilado }) => {

    const { register, handleSubmit, formState: { errors, dirtyFields }, reset } = useForm();
    const existenModificaciones = !!Object.keys(dirtyFields).length;

    const [datos, setDatos] = useState({
        nombre: "",
        color: "",
        stock_loberia: "",
        stock_BuenosAires: "",
        precio_mayorista: "",
        precio_minorista: "",
    });

    /**
     * Actualiza el estado de los datos al cambiar los valores de los campos de entrada.
     *
     * @param {Event} e - Objeto de evento que representa el cambio.
     */
    let getDatos = (e) => {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        });
    }

    /**
     * Envía los datos del formulario para agregar un nuevo hilado.
     *
     * @param {Object} datosEnviados - Datos del formulario enviados.
     */
    let enviarDatos = async (datosEnviados) => {
        try {
            let istrue = await alertWarning("Desea cargar el siguiete producto ?",getTextCompraHilado(datosEnviados));
            if (istrue) {
                let response = await addHilado(datosEnviados);
                alertSuccess(getText(response.data));
                fetchHilado();
                close(true)
            }
            return;
        } catch (err) {
            if (err.response)
                return mostrarAlertError(err.response.data.error);
            else
                mostrarAlertError("Error de red. Inténtalo más tarde.");
        }
    }

    /**
     * Restablece el formulario cuando el modal se cierra.
     */
    useEffect(() => {
        if (!isOpen) {
            reset()
        }
    }, [isOpen])

    return (
        <Modal show={isOpen} onHide={close}>
            <Modal.Header className='header-modal' closeButton>
                <Modal.Title>Registrar Hilado</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form className='form-hilado' onSubmit={handleSubmit(enviarDatos)}>
                    <InputBasico_Components
                        type="text"
                        label="Nombre"
                        name="nombre"
                        placeholder="Ingrese nombre*"
                        onChange={getDatos}
                        register={register}
                        errors={errors}
                        defaultValue=""
                    />
                    <InputBasico_Components
                        type="text"
                        label="Color"
                        name="color"
                        placeholder="Ingrese color*"
                        onChange={getDatos}
                        register={register}
                        errors={errors}
                        defaultValue=""
                    />

                    <InputBasico_Components
                        type="number"
                        label="Stock Lobería"
                        name="stock_loberia"
                        placeholder="Cantidad Lobería*"
                        onChange={getDatos}
                        register={register}
                        errors={errors}
                        defaultValue=""
                    />

                    <InputBasico_Components
                        type="number"
                        label="Stock Buenos Aires"
                        name="stock_BuenosAires"
                        placeholder="Cantidad Buenos Aires*"
                        onChange={getDatos}
                        register={register}
                        errors={errors}
                        defaultValue=""
                    />

                    <InputBasico_Components
                        type="number"
                        label="Precio Mayorista"
                        name="precio_mayorista"
                        placeholder="Precio mayorista*"
                        onChange={getDatos}
                        register={register}
                        errors={errors}
                        defaultValue=""
                    />

                    <InputBasico_Components
                        type="number"
                        label="Precio Minorista"
                        name="precio_minorista"
                        placeholder="Precio minorista*"
                        onChange={getDatos}
                        register={register}
                        errors={errors}
                        defaultValue=""
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

export default Modal_AddHilado_Components