import { useEffect, useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import '../../../../css/modals.css'
import { alertWarning} from '../../../../helpers/sweetAlerts/Alerts';
import { getTextIncrementarStock } from '../../../../helpers/sweetAlerts/Texts_alerts';
import InputBasico_Components from '../../../Inputs/InputBasico_Components';
import InputTypeSelect_Components from '../../../Inputs/InputTypeSelect_Components';
import BtnConfirmar_Cancelar_Components from '../../BtnConfirmar_Cancelar/BtnConfirmar_Cancelar_Components';


/**
 * Componente para el modal de incrementar el stock de un hilado.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {boolean} props.isOpen - Estado que indica si el modal está abierto.
 * @param {function} props.close - Función para cerrar el modal.
 * @param {Object} props.hilado - Datos del hilado al que se le incrementará el stock.
 * @param {function} props.incrementarStock - Función para incrementar el stock del hilado.
 */

const Modal_IncrementarStock = ({ isOpen, close, hilado, incrementarStock }) => {
    const { register, handleSubmit, formState: { errors, dirtyFields }, reset } = useForm();
    const existenModificaciones = !!Object.keys(dirtyFields).length;
    const [datos, setDatos] = useState({
        ciudad: "",
        total: ""
    });

    /**
     * Restablece el formulario cuando el modal se cierra.
     */
    useEffect(() => {
        if (!isOpen) {
            reset()
        }
    }, [isOpen])

    /**
    * Envía los datos del formulario para incrementar el stock del hilado.
    *
    * @param {Object} datos - Datos del formulario enviados.
    */
    const enviarDatos = async (datos) => {
        try {
            const STOCK = {
                id: hilado.id,
                ciudad: datos.ciudad,
                total: datos.total,
            }
            let isTrue = await alertWarning(`Incrementar stock de ${STOCK.ciudad === "stock_loberia" ?"Loberia" : "Bs. As."}` ,getTextIncrementarStock(STOCK, hilado))
            if (isTrue)
                incrementarStock(STOCK)
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
                <Modal.Title>Incremetar stock</Modal.Title>
            </Modal.Header>

            <Modal.Body className='contenedor-modal'>
                <Form className='form-tranferirStock' onSubmit={handleSubmit(enviarDatos)}>

                    <InputTypeSelect_Components
                        label="Ciudad"
                        name="ciudad"
                        options={[
                            { label: "Seleccionar", value: "" },
                            { label: "Buenos Aires", value: "stock_buenosAires" },
                            { label: "Lobería", value: "stock_loberia" },
                        ]}
                        onChange={getDatos}
                        register={register}
                        errors={errors}
                        defaultValue=""
                    />

                    <InputBasico_Components
                        type="number"
                        label="Nuevo Stock"
                        name="total"
                        placeholder="Ingrese el nuevo stock*"
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

export default Modal_IncrementarStock