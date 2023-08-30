import { useEffect, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import '../../../../css/modals.css'
import { alertWarningTransferirStock } from '../../../../helpers/sweetAlerts/Alerts';
import InputBasico_Components from '../../../Inputs/InputBasico_Components';
import InputTypeSelect_Components from '../../../Inputs/InputTypeSelect_Components';
import Logo from '../../../../images/logo.svg'


const Modal_TransferirStock = ({ isOpen, close, hilado, transerirStock }) => {
    const { register, handleSubmit, formState: { errors, dirtyFields }, reset } = useForm();
    const existenModificaciones = !!Object.keys(dirtyFields).length;
    // const [usuario, setUsuario] = useState(user.nombre);
    const [datos, setDatos] = useState({
        cantidad: "",
        origen: "",
        destino: ""
    });
    useEffect(() => {
        if (!isOpen) {
            reset()
        }
    }, [isOpen])

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

                        <img className='logos' src={Logo} alt="" />

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
                <Button className="confirmar"
                    onClick={handleSubmit(enviarDatos)}
                    type='submit'
                    variant="primary"
                    disabled={!existenModificaciones}>
                    Confirmar
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




export default Modal_TransferirStock