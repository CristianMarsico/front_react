import React from 'react'
import { Navigate } from 'react-router-dom';
import General_TablaCompras_Components from '../components/Tablas/TablaCompra/General_TablaCompras_Components'
import useAuth from '../helpers/auth/useAuth';
import RUTAS from '../helpers/RutasHelpers';

const ListaCompra = () => {

    let usuario = localStorage.getItem("Usuario")
    if (!usuario) return <Navigate to={`/`} />
    return (
        <General_TablaCompras_Components />
    )
}

export default ListaCompra