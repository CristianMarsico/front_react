import React from 'react'
import { Navigate } from 'react-router-dom';
import General_TablaCliente_Components from '../components/Tablas/TablaCliente/General_TablaCliente_Components'
import RUTAS from '../helpers/RutasHelpers';


/**
 * Componente que representa la página de lista de clientes.
 * @returns {JSX.Element} Elemento JSX que representa la página de lista de clientes.
 */
const ListaClientes = () => {

    let usuario = localStorage.getItem("Usuario")
    if (!usuario) {
        return <Navigate to={RUTAS.login} />

    }

    // Renderizar el componente de tabla de clientes
    return (
        <General_TablaCliente_Components />
    )
}

export default ListaClientes