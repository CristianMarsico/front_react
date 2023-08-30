import { useEffect, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import '../../../../css/modals.css'
import { alertWarningTransferirStock, alertWarningVender } from '../../../../helpers/sweetAlerts/Alerts';
import InputBasico_Components from '../../../Inputs/InputBasico_Components';
import InputTypeSelect_Components from '../../../Inputs/InputTypeSelect_Components';
import Logo from '../../../../images/swap_horiz_black_24dp.svg';

const Modal_Venta = ({ isOpen, close, hilado, vender }) => {

    const { register, handleSubmit, formState: { errors, dirtyFields }, reset } = useForm();
    const existenModificaciones = !!Object.keys(dirtyFields).length;

    const [datos, setDatos] = useState({
        ciudad: "",
        tipo_venta: "",
        cantidad: "",
    });
    useEffect(() => {
        if (!isOpen) {
            reset()
        }
    }, [isOpen])

    const enviarDatos = async (datos) => {

        try {
            const VENTA = {
                id: hilado.id,
                ciudad: datos.ciudad,
                tipo_venta: datos.tipo_venta,
                cantidad: datos.cantidad
            }

            let isTrue = await alertWarningVender(VENTA, hilado.producto_terminado)
            if (isTrue)
                vender(VENTA)
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
                <Modal.Title>Registrar Venta</Modal.Title>
            </Modal.Header>

            <Modal.Body className='contenedor-modal'>
                <Form className='form-tranferirStock' onSubmit={handleSubmit(enviarDatos)}>


                    <InputTypeSelect_Components
                        label="Ciudad la cual realiza la venta"
                        name="ciudad"
                        options={[
                            { label: "Seleccionar ciudad de despacho", value: "" },
                            { label: "Lobería", value: "stock_loberia" },
                            { label: "Buenos Aires", value: "stock_buenosAires" },
                        ]}
                        onChange={getDatos}
                        register={register}
                        errors={errors}
                        defaultValue=""
                    />

                    <InputTypeSelect_Components
                        label="Tipo de venta"
                        name="tipo_venta"
                        options={[
                            { label: "Seleccionar mayorista o minorista", value: "" },
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
                        label="Unidades a vender"
                        name="cantidad"
                        placeholder="Ingrese la cantidad que desea vender*"
                        onChange={getDatos}
                        register={register}
                        errors={errors}
                        defaultValue=""
                    />

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

export default Modal_Venta