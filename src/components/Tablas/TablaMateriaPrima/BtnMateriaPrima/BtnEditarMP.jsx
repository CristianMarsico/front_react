import React from 'react'
import { Button } from "react-bootstrap";
import { useModal } from '../../../../helpers/hooks/useModal';
import { alertSuccess, mostrarAlertError } from '../../../../helpers/sweetAlerts/Alerts';
import { getText } from '../../../../helpers/sweetAlerts/Texts_alerts';
import { actualizarMP } from '../../../../services/MateriaPrimaServices';
import Modal_UpdateMP from '../Modal/Modal_UpdateMP';

const BtnEditarMP = ({ mp, fetchMateriaPrima }) => {
    const [isOpenChangeEditModal, openChangeEditModal, closeChangeEditModal] = useModal();

    const editarMP = async (datos) => {
        try {
            let response = await actualizarMP(datos);
            if (response.status === 200) {
                alertSuccess(getText(response.data));
                fetchMateriaPrima();
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

            <Modal_UpdateMP
                isOpen={isOpenChangeEditModal}
                close={closeChangeEditModal}
                mp={mp}
                editarMP={editarMP}
            />
        </>
    )
}

export default BtnEditarMP