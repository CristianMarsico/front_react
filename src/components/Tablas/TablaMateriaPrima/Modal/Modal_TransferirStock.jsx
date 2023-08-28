// import { useEffect, useState } from 'react';
// import { Modal, Form, Button } from 'react-bootstrap';
// import { useForm } from 'react-hook-form'
// import BtnCancelar_Components from '../../../botones/BtnCancelar_Components';
// import BtnConfirmar_Components from '../../../botones/BtnConfirmar_Components';
// import InputBasico_Components from '../../../Inputs/Compra_Venta/InputBasico_Components';

// const Modal_TransferirStock = ({ isOpen, close, user, moverStock }) => {
//     const { register, handleSubmit, formState: { errors, dirtyFields }, reset } = useForm();
//     const existenModificaciones = !!Object.keys(dirtyFields).length;
//     // const [usuario, setUsuario] = useState(user.nombre);
//     const [datos, setDatos] = useState({
//         cantidad: "",
//         origen: "",
//         destino: ""
//     });
//     useEffect(() => {
//         if (!isOpen) {
//             reset()
//         }
//     }, [isOpen])

//     const enviarDatos = (datos) => {
//         console.log(datos)
//         // if (!existenModificaciones) {
//         //     return;
//         // } else {
//         //     setUsuario(formData.nombre);

//         // let datos = {
//         //     id: user.id,
//         //     nombre: formData.nombre,
//         // }
//         // moverStock(datos)
//         // close()
//         // }
//     }

//     let getDatos = (e) => {
//         setDatos({
//             ...datos,
//             [e.target.name]: e.target.value
//         });
//     }
//     return (

//         <Modal show={isOpen} onHide={close}>
//             <Modal.Header className='header-modal' closeButton>
//                 <Modal.Title>Transferir de stock</Modal.Title>
//             </Modal.Header>

//             <Modal.Body>
//                 <Form className='form-modal' onSubmit={handleSubmit(enviarDatos)}>

//                     <InputBasico_Components
//                         type="number"
//                         name="cantidad"
//                         label="Cantidad"
//                         placeholder="Ingrese cantidad*"
//                         register={register}
//                         required={true}
//                         getDatos={getDatos}
//                         errors={errors}
//                     />
//                     <InputBasico_Components
//                         type="text"
//                         name="origen"
//                         label="Ciudad Origen"
//                         placeholder="Ingrese de donde desea mover stock*"
//                         register={register}
//                         required={true}
//                         getDatos={getDatos}
//                         errors={errors}
//                     />
//                     <InputBasico_Components
//                         type="text"
//                         name="destino"
//                         label="Ciudad Destino"
//                         placeholder="Ingrese destino de stock*"
//                         register={register}
//                         required={true}
//                         getDatos={getDatos}
//                         errors={errors}
//                     />
//                     <BtnConfirmar_Components
//                         variant="primary"
//                         width="40%"
//                         nombreAccion="Mover Stock"
//                         padding=".4rem"
//                         disabled={!existenModificaciones}
//                     />
//                     <BtnCancelar_Components
//                         variant="secondary"
//                         width="40%"
//                         nombreAccion="Cancelar"
//                         padding=".4rem"
//                         close={close}
//                     />
//                 </Form>
//             </Modal.Body>

//             {/* <Modal.Footer>
//                 <h1>fdf</h1>
//             </Modal.Footer> */}
//         </Modal>
//     )
// }




// export default Modal_TransferirStock