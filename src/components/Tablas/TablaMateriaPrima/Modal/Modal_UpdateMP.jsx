import { useEffect, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { alertWarning } from '../../../../helpers/sweetAlerts/Alerts';
import { getTextUpdateMP } from '../../../../helpers/sweetAlerts/Texts_alerts';
import InputEdit_Components from '../../../Inputs/InputEdit_Components';
import InputTypeCheck_Components from '../../../Inputs/InputTypeCheck_Components';

const Modal_UpdateMP = ({ isOpen, close, mp, editarMP }) => {

    const { register, handleSubmit, formState: { errors, dirtyFields }, reset } = useForm();
    const existenModificaciones = !!Object.keys(dirtyFields).length;

    const [nombre, setNombre] = useState(mp.nombre);
    const [stock, setStock] = useState(mp.stock);
    const [precio, setPrecio] = useState(mp.precio);

    const [mostrarNombre, setMostrarNombre] = useState(false)
    const [mostrarStock, setMostrarStock] = useState(false)
    const [mostrarPrecio, setMostrarPrecio] = useState(false)

    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        if (isOpen)
            setModalOpen(true);
        else {
            setModalOpen(false);
            reset();
        }
    }, [isOpen, reset]);


    let cerrar = () => {
        setMostrarNombre(false)
        setMostrarStock(false)
        setMostrarPrecio(false)
        close();
    }

    let enviarDatos = async (formData) => {
        try {
            let datos = {
                id: mp.id,
                nombre: mostrarNombre ? formData.nombre : nombre,
                stock: mostrarStock ? formData.stock : stock,
                precio: mostrarPrecio ? formData.precio : precio,
            };
            let isTrue = await alertWarning("Desea realizar modificaciones ? ",getTextUpdateMP(mp, datos))
            if (isTrue)
                editarMP(datos)
            setMostrarNombre(false)
            setMostrarStock(false)
            setMostrarPrecio(false)

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
                    <InputTypeCheck_Components
                        show={mostrarNombre}
                        set={setMostrarNombre}
                        text="Permitir editar nombre"
                    />
                    <InputTypeCheck_Components
                        show={mostrarStock}
                        set={setMostrarStock}
                        text="Permitir editar stock"
                    />
                    <InputTypeCheck_Components
                        show={mostrarPrecio}
                        set={setMostrarPrecio}
                        text="Permitir editar precio"
                    />
                    <InputEdit_Components
                        label="Nombre"
                        type="text"
                        name="nombre"
                        defaultValue={mp.nombre}
                        placeholder="Ingrese nombre"
                        disabled={!mostrarNombre}
                        onChange={(e) => setNombre(e.target.value)}
                        register={register}
                        required={mostrarNombre}
                        errorMessage={errors?.nombre?.message}
                    />

                    <InputEdit_Components
                        label="Stock"
                        type="number"
                        name="stock"
                        defaultValue={mp.stock}
                        placeholder="Ingrese stock"
                        disabled={!mostrarStock}
                        onChange={(e) => setStock(e.target.value)}
                        register={register}
                        required={mostrarStock}
                        errorMessage={errors?.stock?.message}
                    />

                    <InputEdit_Components
                        label="Precio"
                        type="number"
                        name="precio"
                        defaultValue={mp.precio}
                        placeholder="Ingrese precio"
                        disabled={!mostrarPrecio}
                        onChange={(e) => setPrecio(e.target.value)}
                        register={register}
                        required={mostrarPrecio}
                        errorMessage={errors?.precio?.message}
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
                    onClick={cerrar}>
                    Cancelar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
export default Modal_UpdateMP