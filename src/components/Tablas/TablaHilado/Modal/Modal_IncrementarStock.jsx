import { useEffect, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import '../../../../css/modals.css'
import { alertWarningIncrementarStock } from '../../../../helpers/sweetAlerts/Alerts';
import InputBasico_Components from '../../../Inputs/InputBasico_Components';
import InputTypeSelect_Components from '../../../Inputs/InputTypeSelect_Components';

const Modal_IncrementarStock = ({ isOpen, close, hilado, incrementarStock }) => {
    const { register, handleSubmit, formState: { errors, dirtyFields }, reset } = useForm();
    const existenModificaciones = !!Object.keys(dirtyFields).length;
    const [datos, setDatos] = useState({
        ciudad: "",
        total: ""
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
                ciudad: datos.ciudad,
                total: datos.total,
            }
            let isTrue = await alertWarningIncrementarStock(STOCK, hilado)
            if (isTrue)
                incrementarStock(STOCK)
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

export default Modal_IncrementarStock