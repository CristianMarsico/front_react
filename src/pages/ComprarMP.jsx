import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import useAuth from '../helpers/auth/useAuth';
import { CompraServices } from '../services/CompraServices';
import { mostrarAlertCompraSuccess, mostrarAlertError } from '../helpers/sweetAlerts/Alerts';
import { getAll } from '../services/MateriaPrima';
import Select from 'react-select';

const ComprarMP = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { tieneToken, deleteUserLocal } = useAuth();
    let navigate = useNavigate();

    const [showInput, setShowInput] = useState(false);
    const [btnText, setBtnText] = useState('Buscar en mis productos');
    const [productos, setProductos] = useState([]);
    const [datos, setDatos] = useState({
        producto: "",
        cantidad: "",
        precio_unitario: "",
        fecha: ""
    });
    const [envioExitoso, setEnvioExitoso] = useState(false);

    const opciones = productos.map(p => ({ value: p.nombre, label: p.nombre }));


    const toggleShowPwd = () => {
        setShowInput(!showInput);
        if (showInput)
            setBtnText('Buscar en mis productos');
        else
            setBtnText('Ingresar Nuevo');
    };

    if (!tieneToken()) deleteUserLocal();

    useEffect(() => {
        async function getAllMP() {
            try {
                let response = await getAll();
                let mp = response.data.response;
                setProductos(mp);

            } catch (err) {
                if (err.response)
                    return mostrarAlertError(err.response.data.error);
                else
                    mostrarAlertError("Error de red. Inténtalo más tarde.");
            }
        }
        getAllMP();
    }, [])

    useEffect(() => {
        setProductos(productos)
    }, [envioExitoso])

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
            setEnvioExitoso(true)
            e.target.reset();
            return;
        } catch (err) {
            if (err.response)
                return mostrarAlertError(err.response.data.error);
            else
                mostrarAlertError("Error de red. Inténtalo más tarde.");
        }
    }


    const customStyles = {
        // Aquí puedes definir los estilos que desees cambiar
        control: (provided, state) => ({
            ...provided,
            padding: '0',
            fontSize: '1rem',
            background: '#fff', // Cambiar el fondo del control
            border: '1px solid #ddd', // Cambiar el borde del control
            borderRadius: '4px', // Cambiar el radio de las esquinas
            // boxShadow: state.isFocused ? '0 0 0 3px #007bff' : 'none', // Cambiar el efecto de sombra al enfocar
            '&:hover': {
                border: '1px solid #007bff', // Cambiar el borde al pasar el cursor por encima
            },
        }),
        option: (provided, state) => ({
            ...provided,
            fontSize: '1rem',
            backgroundColor: state.isSelected ? '#4B89F7' : 'black', // Cambiar el color de fondo de la opción seleccionada
            color: state.isSelected ? 'black' : 'F3E610', // Cambiar el color del texto de la opción seleccionada
            '&:hover': {
                backgroundColor: '#4B89F7', // Cambiar el color de fondo al pasar el cursor por encima de una opción
                color: 'black', // Cambiar el color del texto al pasar el cursor por encima de una opción
            },
        }),
    };

    return (
        <>

            <div className="row justify-content-center">
                <div className="col-sm-8 col-md-6 col-lg-4 qq">
                    <Form style={{ color: "#fff", fontSize: "18px" }} onSubmit={handleSubmit(enviarDatos)}>

                        <div className="d-flex justify-content-center mt-2">
                            <Button onClick={toggleShowPwd} variant="primary" size="sm">{btnText}</Button>
                        </div>
                        {!showInput ? (
                            <Form.Group >
                                <Form.Label>Producto</Form.Label>
                                <Form.Control

                                    type="text"
                                    placeholder="Ingrese el producto"
                                    name="producto"

                                    {...register('producto', {
                                        required: {
                                            value: true,
                                            message: "*Campo requerido",
                                        },
                                    })}
                                    onChange={getDatos}
                                />
                            </Form.Group>
                        ) : (
                            <Form.Group controlId="producto">
                                <Form.Label>Producto</Form.Label>
                                {/* Reemplaza el datalist con el componente react-select */}
                                <Select
                                    placeholder="Buscar Producto"
                                    name='producto'
                                    styles={customStyles}
                                    value={opciones.find(opcion => opcion.value === datos.producto)}
                                    options={opciones}
                                    onChange={(opcion) => setDatos({ ...datos, producto: opcion ? opcion.value : "" })}
                                />
                            </Form.Group>
                        )}
                        <small className='fail'>{errors?.producto?.message}</small>
                        <Form.Group >
                            <Form.Label>Cantidad</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Ingrese la cantidad"
                                name='cantidad'
                                {...register('cantidad', {
                                    required: {
                                        value: true,
                                        message: "*Campo requerido"
                                    }
                                })}
                                onChange={getDatos}
                            />
                            <small className='fail'>{errors?.cantidad?.message}</small>

                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Precio por unidad</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Ingrese precio unitario"
                                name='precio_unitario'
                                {...register('precio_unitario', {
                                    required: {
                                        value: true,
                                        message: "*Campo requerido"
                                    }
                                })}

                                onChange={getDatos}
                            />
                            <small className='fail'>{errors?.precio_unitario?.message}</small>


                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Fecha</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="YYYY/MM//DD"
                                name='fecha'
                                {...register('fecha', {
                                    required: {
                                        value: true,
                                        message: "*Campo requerido"
                                    }
                                })}
                                onChange={getDatos}
                            />
                            <small className='fail'>{errors?.fecha?.message}</small>

                        </Form.Group>
                        <div className="d-flex justify-content-center">
                            <Button variant="primary" type="submit" size="lg">Comprar</Button>
                        </div>
                    </Form>
                </div>
            </div>

        </>
    )
}

export default ComprarMP


