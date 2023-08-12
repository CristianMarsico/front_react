import { useEffect, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { mostrarAlertCompraSuccess, mostrarAlertError } from '../../../../helpers/sweetAlerts/Alerts';
import { CompraServices } from '../../../../services/CompraServices';
import Select from 'react-select';
import customStylesTagSelect from '../../../../helpers/customStyles/customStylesTagSelect';
import '../../../../css/compra_venta.css'
import BtnConfirmar_Components from '../../../botones/BtnConfirmar_Components';
import BtnCancelar_Components from '../../../botones/BtnCancelar_Components';
import InputBasico_Components from '../../../Inputs/InputBasico_Components';

const ModalCompraMP_Components = ({ isOpen, close, fetchMateriaPrima, materiaPrima }) => {


    const { register, handleSubmit, formState: { errors, dirtyFields }, reset } = useForm();
    const [showInput, setShowInput] = useState(false);
    const [btnText, setBtnText] = useState('Buscar en mis productos');
    const existenModificaciones = !!Object.keys(dirtyFields).length;

    const [datos, setDatos] = useState({
        producto: "",
        cantidad: "",
        precio_unitario: "",
        fecha: ""
    });

    const opciones = materiaPrima.map(p => ({ value: p.nombre, label: p.nombre }));

    const toggleShowPwd = () => {
        setShowInput(!showInput);
        if (showInput)
            setBtnText('Buscar Materia Prima');
        else
            setBtnText('Ingresar Nueva');
    };

    let getDatos = (e) => {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        });
    }

    let enviarDatos = async (datosEnviados, e) => {

        if (!datosEnviados.producto)
            datosEnviados.producto = datos.producto;

        try {
            let response = await CompraServices(datosEnviados);
            mostrarAlertCompraSuccess(response.data);
            fetchMateriaPrima();
            e.target.reset();
            close(true)
            return;
        } catch (err) {
            if (err.response)
                return mostrarAlertError(err.response.data.error);
            else
                mostrarAlertError("Error de red. Inténtalo más tarde.");
        }
    }

    useEffect(() => {
        if (!isOpen) {
            reset()
        }
    }, [isOpen])



    return (

        <Modal show={isOpen} onHide={close}>
            <Modal.Header className='header-modal' closeButton>
                <Modal.Title>  {!showInput ? "Registrar nueva compra" : "Buscar compras registradas"}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form className='form-modal' onSubmit={handleSubmit(enviarDatos)}>
                    <div className="d-flex justify-content-center">
                        <Button onClick={toggleShowPwd} variant="primary" size="mg">{btnText}</Button>
                    </div>
                    {!showInput ? (
                        <InputBasico_Components
                            type="text"
                            name="producto"
                            label="Materia Prima"
                            placeholder="Ingrese materia prima*"
                            register={register}
                            required={true}
                            getDatos={getDatos}
                            errors={errors}
                        />
                    ) : (
                        <Form.Group controlId="producto">
                            <Form.Label>Buscar materia prima</Form.Label>
                            <Select
                                placeholder="Buscar..."
                                name='producto'
                                styles={customStylesTagSelect}
                                value={opciones.find(opcion => opcion.value === datos.producto)}
                                options={opciones}
                                onChange={(opcion) => setDatos({ ...datos, producto: opcion ? opcion.value : "" })}
                            />
                            <small className='fail'>{errors?.producto?.message}</small>
                        </Form.Group>
                    )}

                    <InputBasico_Components
                        type="number"
                        name="cantidad"
                        label="Cantidad"
                        placeholder="Ingrese cantidad*"
                        register={register}
                        required={true}
                        getDatos={getDatos}
                        errors={errors}
                    />
                    <InputBasico_Components
                        type="number"
                        name="precio_unitario"
                        label="Precio por unidad"
                        placeholder="Ingrese precio unitario*"
                        register={register}
                        required={true}
                        getDatos={getDatos}
                        errors={errors}
                    />
                    <InputBasico_Components
                        type="date"
                        name="fecha"
                        label="Fecha"
                        placeholder="YYYY/MM/DD"
                        register={register}
                        required={true}
                        getDatos={getDatos}
                        errors={errors}
                    />
                    <BtnConfirmar_Components
                        variant="primary"
                        width="40%"
                        nombreAccion="Registrar"
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

export default ModalCompraMP_Components