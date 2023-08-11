import React from 'react'
import { Button } from 'react-bootstrap'
import { eliminarMateriaPrima } from '../../../services/MateriaPrima';

const BtnEliminarMP = ({ mp, fetchMateriaPrima }) => {

    const eliminarMP = async (id) => {
        try {
            await eliminarMateriaPrima(id)
            fetchMateriaPrima();
        } catch (error) {
            console.error('Error deleting user:', error);
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