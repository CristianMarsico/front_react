// import React, { useState } from 'react'
// import { Button, Form } from 'react-bootstrap';
// import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
// import useAuth from '../../helpers/auth/useAuth';
// import { mostrarAlertCompraSuccess, mostrarAlertError } from '../../helpers/sweetAlerts/Alerts';
// import { CompraServices } from '../../services/CompraServices';

// function GeneralCompra() {
//     const { register, handleSubmit, formState: { errors } } = useForm();
//     const { tieneToken, deleteUserLocal } = useAuth();
//     let navigate = useNavigate();

//     if (!tieneToken()) deleteUserLocal();

//     const [datos, setDatos] = useState({
//         producto: "",
//         cantidad: "",
//         precio_unitario: "",
//         fecha: ""
//     });

//     let getDatos = (e) => {
//         setDatos({
//             ...datos,
//             [e.target.name]: e.target.value
//         });
//     }

//     let enviarDatos = async (datosEnviados, e) => {
//         try {
//             let response = await CompraServices(datosEnviados);
//             mostrarAlertCompraSuccess(response.data);
//             e.target.reset();
//             return;
//         } catch (err) {
//             if (err.response)
//                 return mostrarAlertError(err.response.data.error);
//             else
//                 mostrarAlertError("Error de red. Inténtalo más tarde.");
//         }
//     }

//     return (
//         <>
//             <div className="container">
//                 <div className="row justify-content-center">
//                     <div className="col-sm-8 col-md-6 col-lg-4">
//                         <Form style={{ color: "#fff", fontSize: "18px" }} onSubmit={handleSubmit(enviarDatos)}>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Producto</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     placeholder="Ingrese el producto"
//                                     name='producto'
//                                     {...register('producto', {
//                                         required: {
//                                             value: true,
//                                             message: "*Campo requerido"
//                                         }
//                                     })}
//                                     onChange={getDatos}
//                                 />
//                                 <small className='fail'>{errors?.producto?.message}</small>
//                             </Form.Group>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Cantidad</Form.Label>
//                                 <Form.Control
//                                     type="number"
//                                     placeholder="Ingrese la cantidad"
//                                     name='cantidad'
//                                     {...register('cantidad', {
//                                         required: {
//                                             value: true,
//                                             message: "*Campo requerido"
//                                         }
//                                     })}
//                                     onChange={getDatos}
//                                 />
//                                 <small className='fail'>{errors?.cantidad?.message}</small>

//                             </Form.Group>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Precio por unidad</Form.Label>
//                                 <Form.Control
//                                     type="number"
//                                     placeholder="Ingrese precio unitario"
//                                     name='precio_unitario'
//                                     {...register('precio_unitario', {
//                                         required: {
//                                             value: true,
//                                             message: "*Campo requerido"
//                                         }
//                                     })}
//                                     onChange={getDatos}
//                                 />
//                                 <small className='fail'>{errors?.precio_unitario?.message}</small>


//                             </Form.Group>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Fecha</Form.Label>
//                                 <Form.Control
//                                     type="date"
//                                     placeholder="YYYY/MM//DD"
//                                     name='fecha'
//                                     {...register('fecha', {
//                                         required: {
//                                             value: true,
//                                             message: "*Campo requerido"
//                                         }
//                                     })}
//                                     onChange={getDatos}
//                                 />
//                                 <small className='fail'>{errors?.fecha?.message}</small>

//                             </Form.Group>
//                             <div className="d-flex justify-content-center">
//                                 <Button variant="primary" type="submit" size="lg">Comprar</Button>
//                             </div>
//                         </Form>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }
// export default GeneralCompra