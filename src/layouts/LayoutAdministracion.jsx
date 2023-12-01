import React from 'react'
import RUTAS from '../helpers/RutasHelpers'
import { Outlet, NavLink } from 'react-router-dom'

/**
 * Componente que representa la página de administración de la aplicación.
 * Proporciona enlaces de navegación a las diferentes secciones de administración.
 */
const LayoutAdministracion = () => {

    return (
        <>
            <nav className="layout">
                <NavLink to={RUTAS.listaMP}>Materia Prima</NavLink>
                <NavLink to={RUTAS.enProduc}>En Produccíon</NavLink>
                <NavLink to={RUTAS.listaCompras}>Mis Compras</NavLink>
                <NavLink to={RUTAS.listaProductos}>Producto Terminado</NavLink>
                <NavLink to={RUTAS.listaVentas}>Mis Ventas</NavLink>
                <NavLink to={RUTAS.clientes}>Clientes de Ventas</NavLink>
            </nav>

            <Outlet />
        </>
    )
}

export default LayoutAdministracion