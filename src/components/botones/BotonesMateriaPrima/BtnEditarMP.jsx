
import React from 'react'
import { Button } from "react-bootstrap";
import Modal_UpdateMP from '../../Tablas/TablaMateriaPrima/Modal/Modal_UpdateMP';
import { useModal } from '../../../helpers/hooks/useModal';
import { actualizarMP } from '../../../services/MateriaPrima';
import { mostrarAlertCompraSuccess, mostrarAlertError } from '../../../helpers/sweetAlerts/Alerts';

const BtnEditarMP = ({ mp, fetchMateriaPrima }) => {
    const [isOpenChangeEditModal, openChangeEditModal, closeChangeEditModal] = useModal();

    const editarMP = async (datos) => {
        try {
            let response = await actualizarMP(datos);
            mostrarAlertCompraSuccess(response.data);
            fetchMateriaPrima();
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
            <Button className="dimensionBtn"
                variant="primary"
                onClick={openChangeEditModal}
            >Editar
            </Button>

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