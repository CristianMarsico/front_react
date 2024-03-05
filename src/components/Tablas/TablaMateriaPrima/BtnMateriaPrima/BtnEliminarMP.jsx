import React from 'react'
import { Button } from 'react-bootstrap'
import { alertWarning } from '../../../../helpers/sweetAlerts/Alerts';
import { getTextDelete } from '../../../../helpers/sweetAlerts/Texts_alerts';
import { eliminarMateriaPrima } from '../../../../services/MateriaPrimaServices';

const BtnEliminarMP = ({ mp, fetchMateriaPrima }) => {

    const eliminarMP = async (id) => {
        try {
            let isTrue = await alertWarning("Está seguro que desea eliminar ?",getTextDelete(mp, "Materia Prima"))
            if (isTrue) {
                await eliminarMateriaPrima(id)
                fetchMateriaPrima();
            }
        } catch (error) {
            console.error('Error al eliminar Materia prima: ', error);
        }
    };

    return (
        <>
            <Button variant="outline-danger"
                onClick={() => { eliminarMP(mp.id) }}
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

export default BtnEliminarMP