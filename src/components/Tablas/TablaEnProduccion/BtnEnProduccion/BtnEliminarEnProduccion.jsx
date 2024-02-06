import React from 'react'
import { Button } from 'react-bootstrap'
import { alertWarningDelete } from '../../../../helpers/sweetAlerts/Alerts';
import { eliminarEnProduccion } from '../../../../services/EnProduccionServices';

const BtnEliminarEnProduccion = ({ mp_prod, fetchMateriaPrima }) => {

    const eliminar = async (id) => {
        try {
            let isTrue = await alertWarningDelete(mp_prod, "M.P. en producción")
            if (isTrue) {
                await eliminarEnProduccion(id)
                fetchMateriaPrima();
            }
        } catch (error) {
            console.error('Error al eliminar: ', error);
        }
    };

    return (
        <>
            <Button variant="outline-danger"
                onClick={() => { eliminar(mp_prod.id) }}
                style={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    border: "2px solid red",
                    fontSize: "13px",
                    margin: "2px"
                }}
            >Eliminar</Button>{' '}
        </>
    )
}

export default BtnEliminarEnProduccion