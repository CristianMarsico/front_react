import { useEffect, useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import '../../../../css/modals.css'
import { alertWarningPrecio } from '../../../../helpers/sweetAlerts/Alerts';
import InputBasico_Components from '../../../Inputs/InputBasico_Components';
import InputTypeSelect_Components from '../../../Inputs/InputTypeSelect_Components';
import BtnConfirmar_Cancelar_Components from '../../BtnConfirmar_Cancelar/BtnConfirmar_Cancelar_Components';


/**
 * Componente para el modal de modificar el precio de un hilado.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {boolean} props.isOpen - Estado que indica si el modal está abierto.
 * @param {function} props.close - Función para cerrar el modal.
 * @param {Object} props.hilado - Datos del hilado al que se le modificará el precio.
 * @param {function} props.modificarPrecio - Función para modificar el precio del hilado.
 */
const Modal_ModificarPrecio = ({ isOpen, close, hilado, modificarPrecio }) => {

    const { register, handleSubmit, formState: { errors, dirtyFields }, reset } = useForm();
    const existenModificaciones = !!Object.keys(dirtyFields).length;
    const [datos, setDatos] = useState({
        cantidad: "",
        total: ""
    });

    /**
     *  Restablece el formulario cuando el modal se cierra.
     */
    useEffect(() => {
        if (!isOpen) {
            reset()
        }
    }, [isOpen])


    /**
     * Envía los datos del formulario para modificar el precio del hilado.
     *
     * @param {Object} datos - Datos del formulario enviados.
     */
    const enviarDatos = async (datos) => {

        try {
            const PRECIO = {
                id: hilado.id,
                total: datos.total,
                tipoConsumidor: datos.tipo_consumidor,
            }
            let isTrue = await alertWarningPrecio(PRECIO, hilado)
            if (isTrue)
                modificarPrecio(PRECIO)
        } catch (err) {
            return { error: `algo ha salido mal ${err}` }
        }
    }

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
    return (
        <Modal show={isOpen} onHide={close}>
            <Modal.Header className='header-modal' closeButton>
                <Modal.Title>Cambiar Precio</Modal.Title>
            </Modal.Header>

            <Modal.Body className='contenedor-modal'>
                <Form className='form-tranferirStock' onSubmit={handleSubmit(enviarDatos)}>
                    <InputTypeSelect_Components
                        label="Tipo Consumidor"
                        name="tipo_consumidor"
                        options={[
                            { label: "Seleccionar", value: "" },
                            { label: "Mayorista", value: "precio_venta_mayorista" },
                            { label: "Minorista", value: "precio_venta_minorista" },
                        ]}
                        onChange={getDatos}
                        register={register}
                        errors={errors}
                        defaultValue=""
                    />
                    <InputBasico_Components
                        type="number"
                        label="Nuevo Precio"
                        name="total"
                        placeholder="Ingrese el nuevo Precio*"
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

export default Modal_ModificarPrecio