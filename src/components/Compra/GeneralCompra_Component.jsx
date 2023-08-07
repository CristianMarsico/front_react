import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
// import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { CompraServices } from '../../services/CompraServices';
import { mostrarAlertCompraSuccess, mostrarAlertError } from '../../helpers/sweetAlerts/Alerts';
import Select from 'react-select';
import customStylesTagSelect from '../../helpers/customStyles/customStylesTagSelect';
import InputCompraVenta from '../Inputs/Compra_Venta/InputCompraVenta';


const GeneralCompra_Component = ({ getMPPorNombre, productos }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    // let navigate = useNavigate();

    const [showInput, setShowInput] = useState(false);
    const [btnText, setBtnText] = useState('Buscar en mis productos');

    const [datos, setDatos] = useState({
        producto: "",
        cantidad: "",
        precio_unitario: "",
        fecha: ""
    });

    const opciones = productos.map(p => ({ value: p.nombre, label: p.nombre }));

    const toggleShowPwd = () => {
        setShowInput(!showInput);
        if (showInput)
            setBtnText('Buscar en mis productos');
        else
            setBtnText('Ingresar Nuevo');
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
            getMPPorNombre();
            e.target.reset();
            return;
        } catch (err) {
            if (err.response)
                return mostrarAlertError(err.response.data.error);
            else
                mostrarAlertError("Error de red. Inténtalo más tarde.");
        }
    }

    return (
        <>

            <div className="contenedor_compraVenta">
                <div className="hijo" >
                    <Form style={{ color: "#fff", fontSize: "18px", border: "2px solid #fff", padding: "10px" }} onSubmit={handleSubmit(enviarDatos)}>
                        <div className="d-flex justify-content-center">
                            <Button onClick={toggleShowPwd} variant="primary" size="mg">{btnText}</Button>
                        </div>
                        {!showInput ? (
                            <InputCompraVenta
                                type="text"
                                name="producto"
                                label="Producto"
                                placeholder="Ingrese el producto*"
                                register={register}
                                required={true}
                                getDatos={getDatos}
                                errors={errors}
                            />
                        ) : (
                            <Form.Group controlId="producto">
                                <Form.Label>Buscar en mis productos</Form.Label>
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

                        <InputCompraVenta
                            type="number"
                            name="cantidad"
                            label="Cantidad"
                            placeholder="Ingrese cantidad*"
                            register={register}
                            required={true}
                            getDatos={getDatos}
                            errors={errors}
                        />
                        <InputCompraVenta
                            type="number"
                            name="precio_unitario"
                            label="Precio por unidad"
                            placeholder="Ingrese precio unitario*"
                            register={register}
                            required={true}
                            getDatos={getDatos}
                            errors={errors}
                        />
                        <InputCompraVenta
                            type="date"
                            name="fecha"
                            label="Fecha"
                            placeholder="YYYY/MM/DD"
                            register={register}
                            required={true}
                            getDatos={getDatos}
                            errors={errors}
                        />
                        <div className="d-flex justify-content-center">
                            <Button variant="primary" type="submit" size="lg">Comprar</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default GeneralCompra_Component




