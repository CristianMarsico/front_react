import React from 'react'
import { Navigate } from 'react-router-dom';
import General_TablaCompras_Components from '../components/Tablas/TablaCompra/General_TablaCompras_Components'

/**
 * Componente que representa la página de lista de compras.
 * @returns {JSX.Element} Elemento JSX que representa la página de lista de compras.
 */
const ListaCompra = () => {

    let usuario = localStorage.getItem("Usuario")
    if (!usuario) return <Navigate to={`/`} />
    return (
        <General_TablaCompras_Components />
    )
}

export default ListaCompra