import React from 'react'
import GeneralEnProduc_Components from '../components/Tablas/TablaEnProduccion/GeneralEnProduc_Components'

const ListaEnProduccion = () => {
    let usuario = localStorage.getItem("Usuario")
    if (!usuario) return <Navigate to={`/`} />
    return (
        <GeneralEnProduc_Components />
    )
}

export default ListaEnProduccion