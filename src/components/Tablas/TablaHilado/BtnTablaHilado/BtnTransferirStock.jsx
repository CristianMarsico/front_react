import React from 'react'
import { Button } from 'react-bootstrap';
import { useModal } from '../../../../helpers/hooks/useModal';
import { alertSuccess, mostrarAlertError } from '../../../../helpers/sweetAlerts/Alerts';
import { getText } from '../../../../helpers/sweetAlerts/Texts_alerts';
import { moverStock } from '../../../../services/ProductoService';
import Modal_TransferirStock from '../Modal/Modal_TransferirStock';


const BtnTransferirStock = ({ hilado, fetchHilado }) => {
    const [isOpenChangeTrasnferirStockModal, openChangeEditTrasnferirStockModal, closeChangeEditTrasnferirStockModal] = useModal();

    const transerirStock = async (datos) => {
        try {
            let response = await moverStock(datos)
            if (response.status === 201) {
                alertSuccess(getText(response.data));
                fetchHilado();
                closeChangeEditTrasnferirStockModal(true)
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
            <Button variant="outline-primary"
                onClick={openChangeEditTrasnferirStockModal}
                style={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    border: "2px solid blue",
                    fontSize: "13px",
                    margin: "2px"
                }}
            >Mover Stock</Button>{' '}

            <Modal_TransferirStock
                isOpen={isOpenChangeTrasnferirStockModal}
                close={closeChangeEditTrasnferirStockModal}
                hilado={hilado}
                transerirStock={transerirStock}
            />

        </>
    )
}

export default BtnTransferirStock