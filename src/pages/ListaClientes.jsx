import React from 'react'
import { Navigate } from 'react-router-dom';
import General_TablaCliente_Components from '../components/Tablas/TablaCliente/General_TablaCliente_Components'
import useAuth from '../helpers/auth/useAuth';
import RUTAS from '../helpers/RutasHelpers';

const ListaClientes = () => {


    let usuario = localStorage.getItem("Usuario")
    if (!usuario) {
        return <Navigate to={RUTAS.login} />

    }
    return (
        <General_TablaCliente_Components />
    )
}

export default ListaClientes