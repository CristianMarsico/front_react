import { useEffect, useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import '../../../../css/modals.css'
import { alertWarningTransferirStock } from '../../../../helpers/sweetAlerts/Alerts';
import InputBasico_Components from '../../../Inputs/InputBasico_Components';
import InputTypeSelect_Components from '../../../Inputs/InputTypeSelect_Components';
import Logo from '../../../../images/swap_horiz_black_24dp.svg';
import BtnConfirmar_Cancelar_Components from '../../BtnConfirmar_Cancelar/BtnConfirmar_Cancelar_Components';

/**
 * Componente para el modal de transferir stock de un hilado.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {boolean} props.isOpen - Estado que indica si el modal está abierto.
 * @param {function} props.close - Función para cerrar el modal.
 * @param {Object} props.hilado - Datos del hilado al que se le transferirá stock.
 * @param {function} props.transerirStock - Función para transferir stock del hilado.
 */
const Modal_TransferirStock = ({ isOpen, close, hilado, transerirStock }) => {
    const { register, handleSubmit, formState: { errors, dirtyFields }, reset } = useForm();
    const existenModificaciones = !!Object.keys(dirtyFields).length;

    const [datos, setDatos] = useState({
        cantidad: "",
        origen: "",
        destino: ""
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
     * Envía los datos del formulario para transferir el stock del hilado.
     *
     * @param {Object} datos - Datos del formulario enviados.
     */
    const enviarDatos = async (datos) => {
        try {
            const STOCK = {
                id: hilado.id,
                cantidad: datos.cantidad,
                origen: datos.origen,
                destino: datos.destino
            }
            let isTrue = await alertWarningTransferirStock(STOCK)
            if (isTrue)
                transerirStock(STOCK)
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
                <Modal.Title>Transferir de stock</Modal.Title>
            </Modal.Header>

            <Modal.Body className='contenedor-modal'>
                <Form className='form-tranferirStock' onSubmit={handleSubmit(enviarDatos)}>

                    <div className='contenedor-select'>
                        <InputTypeSelect_Components
                            label="Ciudad Origen"
                            name="origen"
                            options={[
                                { label: "Seleccionar", value: "" },
                                { label: "Lobería", value: "stock_loberia" },
                                { label: "Buenos Aires", value: "stock_buenosAires" },
                            ]}
                            onChange={getDatos}
                            register={register}
                            errors={errors}
                            defaultValue=""
                        />

                        <img src={Logo} alt="" />

                        <InputTypeSelect_Components
                            label="Ciudad Destino"
                            name="destino"
                            options={[
                                { label: "Seleccionar", value: "" },
                                { label: "Lobería", value: "stock_loberia" },
                                { label: "Buenos Aires", value: "stock_buenosAires" },
                            ]}
                            onChange={getDatos}
                            register={register}
                            errors={errors}
                            defaultValue=""
                        />
                    </div>
                    <div className='contenedor-basico'>
                        <InputBasico_Components
                            type="number"
                            label="Cantidad"
                            name="cantidad"
                            placeholder="Ingrese la cantidad a retirar*"
                            onChange={getDatos}
                            register={register}
                            errors={errors}
                            defaultValue=""
                        />
                    </div>
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




export default Modal_TransferirStock