import React from 'react'
import { Button } from 'react-bootstrap';
import { useModal } from '../../../../helpers/hooks/useModal';
import { alertSuccess, mostrarAlertError } from '../../../../helpers/sweetAlerts/Alerts';
import { getText } from '../../../../helpers/sweetAlerts/Texts_alerts';
import { incrementar_stock } from '../../../../services/ProductoService';
import Modal_IncrementarStock from '../Modal/Modal_IncrementarStock';

const BtnIncremetarStock = ({ hilado, fetchHilado }) => {

    const [isOpenChangeStockModal, openChangeEditStockModal, closeChangeEditStockModal] = useModal();

    const incrementarStock = async (datos) => {
        try {
            let response = await incrementar_stock(datos)
            if (response.status === 201) {
                alertSuccess(getText(response.data));
                fetchHilado();
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
            >Sumar Stock</Button>{' '}


            <Modal_IncrementarStock
                isOpen={isOpenChangeStockModal}
                close={closeChangeEditStockModal}
                hilado={hilado}
                incrementarStock={incrementarStock}
            />
        </>
    )
}

export default BtnIncremetarStock