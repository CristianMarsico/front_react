import { useEffect, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import '../../../../css/modals.css'
import { alertWarningPrecio } from '../../../../helpers/sweetAlerts/Alerts';
import InputBasico_Components from '../../../Inputs/InputBasico_Components';
import InputTypeSelect_Components from '../../../Inputs/InputTypeSelect_Components';

const Modal_ModificarPrecio = ({ isOpen, close, hilado, modificarPrecio }) => {

    const { register, handleSubmit, formState: { errors, dirtyFields }, reset } = useForm();
    const existenModificaciones = !!Object.keys(dirtyFields).length;
    const [datos, setDatos] = useState({
        cantidad: "",
        total: ""
    });

    useEffect(() => {
        if (!isOpen) {
            reset()
        }
    }, [isOpen])

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

export default Modal_ModificarPrecio