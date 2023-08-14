import React from 'react'
import { Button } from 'react-bootstrap'
import { alertWarningDelete } from '../../../helpers/sweetAlerts/Alerts';
import { eliminarMateriaPrima } from '../../../services/MateriaPrima';

const BtnEliminarMP = ({ mp, fetchMateriaPrima }) => {

    const eliminarMP = async (id) => {
        try {
            let isTrue = await alertWarningDelete(mp)
            if (isTrue) {
                await eliminarMateriaPrima(id)
                fetchMateriaPrima();
            }
        } catch (error) {
            console.error('Error al eliminar Materia prima: ', error);
        }
    };

    return (
        <Button className="dimensionBtn"
            variant="danger"
            onClick={() => { eliminarMP(mp.id) }}
        >Eliminar
        </Button>
    )
}

export default BtnEliminarMP