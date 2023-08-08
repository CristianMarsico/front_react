import React, { useState } from 'react'
import { Button, Dropdown, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import { mostrarAlertCompraSuccess, mostrarAlertError } from '../../helpers/sweetAlerts/Alerts';
import InputCompraVenta from '../Inputs/Compra_Venta/InputCompraVenta'
import customStylesTagSelect from '../../helpers/customStyles/customStylesTagSelect';
import { VentaServices } from '../../services/VentaServices';


const GeneralVenta_component = ({ getProductos, productos }) => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [datos, setDatos] = useState({
        id: "",
        cantidad: "",
        origen: "",
        tipo_venta: ""
    });

    const opciones = productos.map(p => ({ value: p.id, label: p.producto_terminado }));

    let getDatos = (e) => {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        });
    }

    let enviarDatos = async (datosEnviados, e) => {
        if (!datosEnviados.id)
            datosEnviados.id = datos.id;
        try {
            let response = await VentaServices(datosEnviados);
            mostrarAlertCompraSuccess(response.data)
            getProductos();
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
        <div className="contenedor_compraVenta">
            <div className="hijo" >
                <Form onSubmit={handleSubmit(enviarDatos)}>
                    <Form.Group controlId="id">
                        <Form.Label>Buscar en mis productos</Form.Label>
                        <Select
                            placeholder="Buscar..."
                            name='id'
                            styles={customStylesTagSelect}
                            value={opciones.find(opcion => opcion.value === datos.id)}
                            options={opciones}
                            onChange={(opcion) => setDatos({ ...datos, id: opcion ? opcion.value : "" })}
                        />
                        <small className='fail'>{errors?.value?.message}</small>
                    </Form.Group>

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



                    <Form.Group>
                        <Form.Label>Seleccionar Ciudad</Form.Label>
                        <Form.Select aria-label="Default select example"
                            name='origen'

                            {...register('origen', {
                                required: {
                                    value: true,
                                    message: "Debe seleccionar una ciudad*"
                                }
                            })}
                        >
                            <option value="">Selecciona Ciudad</option>
                            <option value="stock_BuenosAires">Ciudad Buenos Aires</option>
                            <option value="stock_loberia">Ciudad Lobería</option>
                        </Form.Select>
                        <small className='fail'>{errors?.origen?.message}</small>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Tipo de venta</Form.Label>
                        <Form.Select aria-label="Default select example"
                            name='tipo_venta'
                            type="text"
                            as="select"
                            {...register('tipo_venta', {
                                required: {
                                    value: true,
                                    message: "Debe seleccionar una ciudad*"
                                }
                            })}
                        >
                            <option value="">Selecciona tipo consumidor</option>
                            <option value="precio_venta_mayorista">Venta mayorista</option>
                            <option value="precio_venta_minorista">Venta minorista</option>
                        </Form.Select>
                        <small className='fail'>{errors?.tipo_venta?.message}</small>
                    </Form.Group>

                    <div className="d-flex justify-content-center">
                        <Button variant="primary" type="submit" size="lg">Registrar Venta</Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default GeneralVenta_component