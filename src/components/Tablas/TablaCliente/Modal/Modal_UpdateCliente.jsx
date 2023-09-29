import { useEffect, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { alertWarningUpdateCliente } from '../../../../helpers/sweetAlerts/Alerts';
import InputEdit_Components from '../../../Inputs/InputEdit_Components';
import InputTypeCheck_Components from '../../../Inputs/InputTypeCheck_Components';

const Modal_UpdateCliente = ({ isOpen, close, cliente, editarCliente }) => {
    const { register, handleSubmit, formState: { errors, dirtyFields }, reset } = useForm();
    const existenModificaciones = !!Object.keys(dirtyFields).length;

    const [direccion, setDireccion] = useState(cliente.direccion);
    const [email, setEmail] = useState(cliente.email);
    const [telefono, setTelefono] = useState(cliente.telefono);

    const [mostrarDireccion, setMostrarDireccion] = useState(false)
    const [mostrarEmail, setMostrarEmail] = useState(false)
    const [mostrarTelefono, setMostrarTelefono] = useState(false)

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
        setMostrarDireccion(false)
        setMostrarEmail(false)
        setMostrarTelefono(false)
        close();
    }

    let enviarDatos = async (formData) => {
        try {
            let datos = {
                id: cliente.id_cliente,
                direccion: mostrarDireccion ? formData.direccion : direccion,
                email: mostrarEmail ? formData.email : email,
                telefono: mostrarTelefono ? formData.telefono : telefono,
            };
            let isTrue = await alertWarningUpdateCliente(cliente, datos)
            if (isTrue)
                editarCliente(datos)
            setMostrarDireccion(false)
            setMostrarEmail(false)
            setMostrarTelefono(false)

        } catch (err) {
            return { error: `algo ha salido mal ${err}` }
        }
    }

    return (
        <Modal show={isOpen} onHide={close}>
            <Modal.Header className='header-modal' closeButton>
                <Modal.Title>Desea editar al cliente: <span className='span-mp-name'>{cliente.nombre}</span></Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form className='form-modal' onSubmit={handleSubmit(enviarDatos)}>
                    <InputTypeCheck_Components
                        show={mostrarDireccion}
                        set={setMostrarDireccion}
                        text="Permitir editar direccion"
                    />
                    <InputTypeCheck_Components
                        show={mostrarEmail}
                        set={setMostrarEmail}
                        text="Permitir editar email"
                    />
                    <InputTypeCheck_Components
                        show={mostrarTelefono}
                        set={setMostrarTelefono}
                        text="Permitir editar telefono"
                    />
                    <InputEdit_Components
                        label="direccion"
                        type="text"
                        name="direccion"
                        defaultValue={cliente.direccion}
                        placeholder="Ingrese direccion"
                        disabled={!mostrarDireccion}
                        onChange={(e) => setDireccion(e.target.value)}
                        register={register}
                        required={mostrarDireccion}
                        errorMessage={errors?.direccion?.message}
                    />

                    <InputEdit_Components
                        label="email"
                        type="email"
                        name="email"
                        defaultValue={cliente.email}
                        placeholder="Ingrese email"
                        disabled={!mostrarEmail}
                        onChange={(e) => setEmail(e.target.value)}
                        register={register}
                        required={mostrarEmail}
                        errorMessage={errors?.email?.message}
                    />

                    <InputEdit_Components
                        label="telefono"
                        type="number"
                        name="telefono"
                        defaultValue={cliente.telefono}
                        placeholder="Ingrese telefono"
                        disabled={!mostrarTelefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        register={register}
                        required={mostrarTelefono}
                        errorMessage={errors?.telefono?.message}
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

export default Modal_UpdateCliente