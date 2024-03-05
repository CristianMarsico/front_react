import React from 'react'
import { Button } from 'react-bootstrap';
import { useModal } from '../../../../helpers/hooks/useModal';
import { alertSuccess, mostrarAlertError } from '../../../../helpers/sweetAlerts/Alerts';
import { getText } from '../../../../helpers/sweetAlerts/Texts_alerts';
import { vender } from '../../../../services/ProductoService';
import Modal_Venta from '../Modal/Modal_Venta';

const BtnVender = ({ hilado, fetchHilado }) => {
    const [isOpenChangeVenderModal, openChangeVenderModal, closeChangeVenderModal] = useModal();

    const registarVenta = async (datos) => {
        try {
            let response = await vender(datos)
            if (response.status === 200) {
                alertSuccess(getText(response.data));
                fetchHilado();
                closeChangeVenderModal(true)
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
            {/* <Button className="dimensionBtn"
                variant="danger"
                onClick={openChangeVenderModal}
            >Registrar Venta
            </Button> */}

            <Button variant="outline-danger"
                onClick={openChangeVenderModal}
                style={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    border: "2px solid red",
                    fontSize: "13px",
                    margin: "2px"
                }}
            >Registrar Venta</Button>{' '}

            <Modal_Venta
                isOpen={isOpenChangeVenderModal}
                close={closeChangeVenderModal}
                hilado={hilado}
                vender={registarVenta}
            />

        </>
    )
}

export default BtnVender