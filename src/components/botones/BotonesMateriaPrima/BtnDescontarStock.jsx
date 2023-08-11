import React from 'react'
import { Button } from 'react-bootstrap';
import { useModal } from '../../../helpers/hooks/useModal';
import { mostrarAlertError } from '../../../helpers/sweetAlerts/Alerts';
import { actualizarStock } from '../../../services/MateriaPrima';
import Modal_DescontarStock from '../../Tablas/TablaMateriaPrima/Modal/Modal_DescontarStock';

const BtnDescontarStock = ({ mp, fetchMateriaPrima }) => {

    const [isOpenChangeSotckModal, openChangeEditStockModal, closeChangeEditStockModal] = useModal();


    const descontarStock = async (datos) => {
        try {
            await actualizarStock(datos)
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
                variant="info"
                onClick={openChangeEditStockModal}
            >Quitar Stock
            </Button>

            <Modal_DescontarStock
                isOpen={isOpenChangeSotckModal}
                close={closeChangeEditStockModal}
                mp={mp}
                descontarStock={descontarStock}
            />

        </>
    )
}

export default BtnDescontarStock