import React from 'react'
import { Button } from "react-bootstrap";
import { useModal } from '../../../../helpers/hooks/useModal';
import { mostrarAlertCompraSuccess, mostrarAlertError } from '../../../../helpers/sweetAlerts/Alerts';


import { actualizarMP } from '../../../../services/MateriaPrimaServices';
import Modal_UpdateMP from '../Modal/Modal_UpdateMP';



const BtnEditarMP = ({ mp, fetchMateriaPrima }) => {
    const [isOpenChangeEditModal, openChangeEditModal, closeChangeEditModal] = useModal();

    const editarMP = async (datos) => {
        try {
            let response = await actualizarMP(datos);
            if (response.status === 200) {
                mostrarAlertCompraSuccess(response.data);
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