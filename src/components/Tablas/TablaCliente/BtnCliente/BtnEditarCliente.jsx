import React from 'react'
import { Button } from 'react-bootstrap';
import { mostrarAlertCompraSuccess, mostrarAlertError } from '../../../../helpers/sweetAlerts/Alerts';
import { useModal } from '../../../../helpers/hooks/useModal';
import Modal_UpdateCliente from '../Modal/Modal_UpdateCliente';
import { actualizarCliente } from '../../../../services/ClienteServices';

const BtnEditarCliente = ({ cliente, fetchCliente }) => {
    const [isOpenChangeEditModal, openChangeEditModal, closeChangeEditModal] = useModal();

    const editarCliente = async (datos) => {
        try {
            let response = await actualizarCliente(datos);
            if (response.status === 200) {
                mostrarAlertCompraSuccess(response.data);
                fetchCliente();
                closeChangeEditModal(true)
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
                onClick={openChangeEditModal}
                style={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    border: "2px solid green",
                    fontSize: "13px",
                    margin: "2px"
                }}
            >Editar</Button>{' '}

            <Modal_UpdateCliente
                isOpen={isOpenChangeEditModal}
                close={closeChangeEditModal}
                cliente={cliente}
                editarCliente={editarCliente}
            />
        </>
    )
}


export default BtnEditarCliente