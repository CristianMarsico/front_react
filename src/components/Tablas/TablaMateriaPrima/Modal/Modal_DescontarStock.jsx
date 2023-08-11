import { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { mostrarAlertError } from '../../../../helpers/sweetAlerts/Alerts';
import BtnCancelar_Components from '../../../botones/BtnCancelar_Components';
import BtnConfirmar_Components from '../../../botones/BtnConfirmar_Components';
import InputBasico_Components from '../../../Inputs/InputBasico_Components';


const Modal_DescontarStock = ({ isOpen, close, mp, descontarStock }) => {
    const { register, handleSubmit, formState: { errors, dirtyFields }, reset } = useForm();
    // const [showInput, setShowInput] = useState(false);

    const [datos, setDatos] = useState({
        cantidad: "",
    });

    let getDatos = (e) => {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        });
    }

    let enviarDatos = async (datosEnviados, e) => {
        try {
            const STOCK = {
                id: mp.id,
                cantidad: datosEnviados.cantidad
            }
            descontarStock(STOCK)
            e.target.reset();
            close(true)
        } catch (err) {
            return { error: `algo ha salido mal ${err}` }
        }
    }

    return (
        <Modal show={isOpen} onHide={close}>
            <Modal.Header className='header-modal' closeButton>
                <Modal.Title>Retirar stock de {mp.nombre}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form className='form-modal' onSubmit={handleSubmit(enviarDatos)}>
                    <InputBasico_Components
                        type="number"
                        name="cantidad"
                        label="Cantidad"
                        placeholder="Ingrese cantidad que desea retirar*"
                        register={register}
                        required={true}
                        getDatos={getDatos}
                        errors={errors}
                    />
                    <BtnConfirmar_Components
                        variant="primary"
                        width="40%"
                        nombreAccion="Retirar Stock"
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


export default Modal_DescontarStock