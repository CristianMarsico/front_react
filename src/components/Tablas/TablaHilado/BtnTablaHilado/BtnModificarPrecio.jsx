import React from 'react'
import { Button } from 'react-bootstrap';
import { useModal } from '../../../../helpers/hooks/useModal';
import { mostrarAlertCompraSuccess, mostrarAlertError } from '../../../../helpers/sweetAlerts/Alerts';
import { actualizarPrecio } from '../../../../services/ProductoService';
import Modal_ModificarPrecio from '../Modal/Modal_ModificarPrecio';

const BtnModificarPrecio = ({ hilado, fetchHilado }) => {
    const [isOpenChangePrecioModal, openChangeEditPrecioModal, closeChangeEditPrecioModal] = useModal();

    const modificarPrecio = async (datos) => {
        try {
            let response = await actualizarPrecio(datos)
            if (response.status === 201) {
                mostrarAlertCompraSuccess(response.data);
                fetchHilado();
                closeChangeEditPrecioModal(true)
            }
            return;
        } catch (err) {
            if (err.response)
                return mostrarAlertError(err.response.data.error);
            else
                mostrarAlertError("Error de red. Inténtalo más tarde.");
        }
    };

    return (
        <>

            <Button variant="outline-success"
                onClick={openChangeEditPrecioModal}
                style={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    border: "2px solid green",
                    fontSize: "13px",
                    margin: "2px"
                }}
            >Cambiar Precio</Button>{' '}

            <Modal_ModificarPrecio
                isOpen={isOpenChangePrecioModal}
                close={closeChangeEditPrecioModal}
                hilado={hilado}
                modificarPrecio={modificarPrecio}
            />
        </>
    )
}

export default BtnModificarPrecio