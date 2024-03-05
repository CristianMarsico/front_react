import { useEffect, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { alertSuccess, alertWarning, mostrarAlertError } from '../../../../helpers/sweetAlerts/Alerts';
import { CompraServices } from '../../../../services/CompraServices';
import Select from 'react-select';
import customStylesTagSelect from '../../../../helpers/customStyles/customStylesTagSelect';
import '../../../../css/modals.css'
import InputTypeDate_Components from '../../../Inputs/InputTypeDate_Components';
import InputBasico_Components from '../../../Inputs/InputBasico_Components';
import BtnConfirmar_Cancelar_Components from '../../BtnConfirmar_Cancelar/BtnConfirmar_Cancelar_Components';
import { getText, getTextAddMP } from '../../../../helpers/sweetAlerts/Texts_alerts';


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

    let enviarDatos = async (datosEnviados) => {
        try {
            if (!datosEnviados.producto)
                datosEnviados.producto = datos.producto;

            let isTrue = await alertWarning("Comprar Materia Prima ?",getTextAddMP(datosEnviados))
            if (isTrue) {
                let response = await CompraServices(datosEnviados);
                alertSuccess(getText(response.data));
                fetchMateriaPrima();
                close(true)
                return;
            }

        } catch (err) {
            console.log(err)
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

    const fechaActual = new Date().toISOString().split('T')[0];

    return (
        <Modal show={isOpen} onHide={close}>
            <Modal.Header className='header-modal' closeButton>
                <Modal.Title>  {!showInput ? "Registrar nueva compra" : "Buscar compras registradas"}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form className='form-modal' onSubmit={handleSubmit(enviarDatos)}>
                    <div className="d-flex justify-content-center mt-0">
                        {
                            !showInput ?
                                <Button onClick={toggleShowPwd} variant="primary">{btnText}</Button>
                                :
                                <Button onClick={toggleShowPwd} variant="success">{btnText}</Button>

                        }
                    </div>
                    {!showInput ? (
                        <InputBasico_Components
                            type="text"
                            label="Materia Prima"
                            name="producto"
                            placeholder="Ingrese materia prima*"
                            onChange={getDatos}
                            register={register}
                            errors={errors}
                            defaultValue=""
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
                        label="Cantidad"
                        name="cantidad"
                        placeholder="Ingrese cantidad*"
                        onChange={getDatos}
                        register={register}
                        errors={errors}
                        defaultValue=""
                    />
                    <InputBasico_Components
                        type="number"
                        label="Precio por unidad"
                        name="precio_unitario"
                        placeholder="Ingrese precio unitario*"
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

export default ModalCompraMP_Components