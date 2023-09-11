import { useEffect, useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import '../../../../css/modals.css'
import { alertWarningVender } from '../../../../helpers/sweetAlerts/Alerts';
import InputBasico_Components from '../../../Inputs/InputBasico_Components';
import InputTypeDate_Components from '../../../Inputs/InputTypeDate_Components';
import InputTypeSelect_Components from '../../../Inputs/InputTypeSelect_Components';
import BtnConfirmar_Cancelar_Components from '../../BtnConfirmar_Cancelar/BtnConfirmar_Cancelar_Components';

const Modal_Venta = ({ isOpen, close, hilado, vender }) => {

    const { register, handleSubmit, formState: { errors, dirtyFields }, reset } = useForm();
    const existenModificaciones = !!Object.keys(dirtyFields).length;

    const [datos, setDatos] = useState({
        ciudad: "",
        tipo_venta: "",
        cantidad: "",
        medio_pago: "",
        cliente: "",
        fecha: ""
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
                nombre_prod: hilado.producto_terminado,
                color: hilado.color,
                ciudad: datos.ciudad,
                tipo_venta: datos.tipo_venta,
                cantidad: datos.cantidad,
                medio_pago: datos.medio_pago,
                cliente: datos.cliente,
                fecha: datos.fecha
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
    const fechaActual = new Date().toISOString().split('T')[0];

    return (
        <Modal show={isOpen} onHide={close}>
            <Modal.Header className='header-modal' closeButton>
                <Modal.Title>Registrar Venta</Modal.Title>
            </Modal.Header>

            <Modal.Body className='contenedor-modal'>
                <Form className='form-tranferirStock' onSubmit={handleSubmit(enviarDatos)}>


                    <InputTypeSelect_Components
                        label="Ciudad"
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
                        label="Cantidad a vender"
                        name="cantidad"
                        placeholder="Ingrese la cantidad que desea vender*"
                        onChange={getDatos}
                        register={register}
                        errors={errors}
                        defaultValue=""
                    />

                    <InputTypeSelect_Components
                        label="Medio de pago"
                        name="medio_pago"
                        options={[
                            { label: "Seleccionar medio de pago", value: "" },
                            { label: "Mercado Pago", value: "mercado_pago" },
                            { label: "App", value: "app" },
                        ]}
                        onChange={getDatos}
                        register={register}
                        errors={errors}
                        defaultValue=""
                    />
                    <InputBasico_Components
                        type="text"
                        label="Cliente/Empresa"
                        name="cliente"
                        placeholder="Ingrese nombre de cliente/empresa*"
                        onChange={getDatos}
                        register={register}
                        errors={errors}
                        defaultValue=""
                    />

                    <InputTypeDate_Components
                        type="date"
                        label="Fecha"
                        name="fecha"
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

export default Modal_Venta