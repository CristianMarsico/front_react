import React from 'react'
import { Button } from 'react-bootstrap';
import { useModal } from '../../../../helpers/hooks/useModal';
import { mostrarAlertCompraSuccess, mostrarAlertError } from '../../../../helpers/sweetAlerts/Alerts';
import { actualizarStock } from '../../../../services/MateriaPrimaServices';
import Modal_DescontarStock from '../Modal/Modal_DescontarStock';

const BtnDescontarStock = ({ mp, fetchMateriaPrima }) => {

    const [isOpenChangeSotckModal, openChangeEditStockModal, closeChangeEditStockModal] = useModal();


    const descontarStock = async (datos) => {
        try {
            let response = await actualizarStock(datos)
            if (response.status === 201) {
                mostrarAlertCompraSuccess(response.data);
                fetchMateriaPrima();
                closeChangeEditStockModal(true)
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
            <Button variant="outline-dark"
                onClick={openChangeEditStockModal}
                style={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    border: "2px solid black",
                    fontSize: "13px",
                    margin: "2px"
                }}
            >Enviar a Producción</Button>{' '}


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