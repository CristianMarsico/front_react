import { useEffect, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { alertWarningUpdate } from '../../../../helpers/sweetAlerts/Alerts';
import InputBasico_Components from '../../../Inputs/InputBasico_Components';


const Modal_UpdateMP = ({ isOpen, close, mp, editarMP }) => {

    const { register, handleSubmit, formState: { errors, dirtyFields }, reset } = useForm();
    const existenModificaciones = !!Object.keys(dirtyFields).length;

    const [datos, setDatos] = useState({
        nombre: "",
        stock: ""
    });

    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        if (isOpen)
            setModalOpen(true);
        else {
            setModalOpen(false);
            reset();
        }
    }, [isOpen, reset]);

    let getDatos = (e) => {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        });
    }

    let enviarDatos = async (formData) => {
        try {
            let datos = {
                id: mp.id,
                nombre: formData.nombre,
                stock: formData.stock,
            }
            let isTrue = await alertWarningUpdate(mp, datos)
            if (isTrue)
                editarMP(datos)

        } catch (err) {
            return { error: `algo ha salido mal ${err}` }
        }
    }

    return (
        <Modal show={isOpen} onHide={close}>
            <Modal.Header className='header-modal' closeButton>
                <Modal.Title>Desea modificar: <span className='span-mp-name'>{mp.nombre}</span></Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form className='form-modal' onSubmit={handleSubmit(enviarDatos)}>
                    <InputBasico_Components
                        type="text"
                        label="Nombre"
                        name="nombre"
                        placeholder="Escribe un nuevo nombre*"
                        onChange={getDatos}
                        register={register}
                        errors={errors}
                        defaultValue={mp.nombre}
                    />
                    <InputBasico_Components
                        type="text"
                        label="Stock"
                        name="stock"
                        placeholder="Ingrese un nuevo stock*"
                        onChange={getDatos}
                        register={register}
                        errors={errors}
                        defaultValue={mp.stock}
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
export default Modal_UpdateMP