import React from 'react'
import GeneralEnProduc_Components from '../components/Tablas/TablaEnProduccion/GeneralEnProduc_Components'


/**
 * Componente que representa la página de lista de productos en producción.
 * @returns {JSX.Element} Elemento JSX que representa la página de productos en producción.
 */
const ListaEnProduccion = () => {
    let usuario = localStorage.getItem("Usuario")
    if (!usuario) return <Navigate to={`/`} />
    return (
        <GeneralEnProduc_Components />
    )
}

export default ListaEnProduccion